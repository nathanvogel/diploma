"use strict";
const joi = require("joi");
const createRouter = require("@arangodb/foxx/router");
const db = require("@arangodb").db;
// const errors = require("@arangodb").errors;
const query = require("@arangodb").query;
const validator = require("validator");
const UrlParse = require("url-parse");

const apiFactory = require("../utils/apiFactory");
const souSchema = require("../utils/schemas").souSchema;
const getRootDomain = require("../utils/utils").getRootDomain;
const CONST = require("../utils/const.js");
const souColl = db._collection(CONST.souCollectionName);
const { getSimplifiedLink } = require("../utils/refFromUrl");
// const DOC_NOT_FOUND = errors.ERROR_ARANGO_DOCUMENT_NOT_FOUND.code;

const router = createRouter();
module.exports = router;

function getRefType(fullRef) {
  const isURL = validator.isURL(fullRef, {
    protocols: ["http", "https", "ftp"],
    require_tld: true,
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_underscores: false,
    host_whitelist: false,
    host_blacklist: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    disallow_auth: false
  });
  return isURL ? CONST.SOURCE_TYPES.LINK : CONST.SOURCE_TYPES.REF;
}

function saveNewSources(sources) {
  const multiple = Array.isArray(sources);
  const body = multiple ? sources : [sources];
  const now = Date.now();

  let data = [];
  for (var doc of body) {
    // TODO: search by ref if it exists.
    Object.assign(doc, { ts: now, tsc: now });
    const meta = souColl.save(doc);
    data.push(Object.assign(doc, meta));
  }
  return multiple ? data : data[0];
}

// POST a new source
router
  .post("/", function(req, res) {
    const savedSources = saveNewSources(req.body);
    res.send(savedSources);
  })
  .body(
    joi.alternatives().try(souSchema, joi.array().items(souSchema)),
    "Source or sources to store in the collection."
  )
  .response(
    joi
      .alternatives()
      .try(joi.object().required(), joi.array().items(joi.object().required())),
    "Source or sources stored in the collection."
  )
  .summary("Stores a source or sources")
  .description("Stores a single Source or multiple sources in the collection.");

// GET many sources
router
  .get("/many", apiFactory.getMany.bind(this, souColl))
  .queryParam(
    "keys",
    joi
      .alternatives()
      .try(joi.string().required(), joi.array().items(joi.string())),
    "Keys of the sources"
  )
  .response(
    joi.array(souSchema).required(),
    "Sources stored in the collection."
  )
  .summary("Retrieve many sources")
  .description("Retrieves many sources by key in one request.");

// GET a source
router
  .get("/:key", apiFactory.get.bind(this, souColl))
  .pathParam("key", joi.string().required(), "Key of the source.")
  .response(joi.object().required(), "Source stored in the collection.")
  .summary("Retrieve a source")
  .description("Retrieves a source by key.");

// PATCH a source
router
  .patch("/", apiFactory.patch.bind(this, souColl))
  .body(
    joi.alternatives().try(souSchema, joi.array().items(souSchema)),
    "Source(s) to patch in the collection."
  )
  .response(
    joi
      .alternatives()
      .try(joi.object().required(), joi.array().items(joi.object().required())),
    "Source(s) stored in the collection."
  )
  .summary("Updates (merges) a source(s)")
  .description("Updates (merges) a source(s) in the collection.");

// GET source suggestions for autocomplete
router
  .get("/autocomplete", function(req, res) {
    var searchTerm = req.queryParams.search;
    if (!searchTerm || typeof searchTerm !== "string") {
      res.throw(400, "Please indicate the fullRef parameter as a string");
    }
    searchTerm = searchTerm.trim();
    const type = getRefType(searchTerm);
    var dbSearchTerm = searchTerm;
    if (type === CONST.SOURCE_TYPES.LINK) {
      dbSearchTerm = getSimplifiedLink(searchTerm);
    }

    // TODO: use KEEP() ?
    const entities = query`
      FOR source IN ${souColl}
        FILTER source.pTitle LIKE ${"%" + dbSearchTerm + "%"}
          OR source.ref LIKE ${"%" + dbSearchTerm + "%"}
        RETURN {"ref": source.ref, "_key": source._key, "pTitle": source.pTitle, "fullUrl": source.fullUrl }
    `;
    res.send(entities);
  })
  .queryParam("search", joi.string().required(), "The user input")
  .response(
    joi
      .array()
      .items(joi.object().required())
      .required(),
    "List of matched sources"
  )
  .summary("Autocomplete sources")
  .description("Searches references for autocomplete suggestions.");

// GET a source by ref search.
// If it exists -> returns the existing one
// Else -> returns a new pre-filled source.
router
  .get("/ref", function(req, res) {
    var fullRef = req.queryParams.fullRef;
    if (!fullRef || typeof fullRef !== "string") {
      res.throw(400, "Please indicate the fullRef parameter as a string");
      return;
    }
    fullRef = fullRef.trim();
    const type = getRefType(fullRef);
    const isLink = type === CONST.SOURCE_TYPES.LINK;
    var ref = fullRef;
    var domain, rootDomain;
    if (isLink) {
      const parsedUrl = new UrlParse(fullRef);
      domain = parsedUrl.hostname;
      rootDomain = getRootDomain(domain);
      ref = getSimplifiedLink(fullRef, parsedUrl, rootDomain);
    }

    const cursor = query`
      FOR source IN ${souColl}
        FILTER source.ref == ${ref}
        LIMIT 1
        RETURN source
    `;
    if (cursor.hasNext()) {
      res.send(cursor.next());
      return;
    }
    // else if (cursor.length > 1) {
    //   res.throw(500, "Multiple sources correspond to this ref.")
    // }

    var fullUrl = isLink ? fullRef : null;
    // The ref doesn't already exist, so we generate a model for the user
    // to start with when creating the source.
    const newRef = {
      ref: ref,
      fullUrl: fullUrl,
      description: "",
      domain: domain,
      rootDomain: rootDomain,
      type: type,
      authors: []
    };
    res.send(newRef);
  })
  .queryParam("fullRef", joi.string().required(), "The user input")
  .response(souSchema, "The source, existing or a new one (without _key)")
  .summary("Get a source object from a ref")
  .description(`Searches for existing sources corresponding to the ref.
    If one exists, return it, else generate a new pre-filled one.`);
