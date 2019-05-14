"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var arangojs_1 = require("arangojs");
var saveJSON_1 = __importDefault(require("./fileIO/saveJSON"));
var loadMF_1 = __importDefault(require("./loadMF"));
var constants_1 = __importDefault(require("./utils/constants"));
var consistency_1 = require("./utils/consistency");
var ask_1 = __importDefault(require("./utils/ask"));
var api_1 = __importStar(require("./utils/api"));
var utils_1 = require("./utils/utils");
var db = new arangojs_1.Database({
    url: constants_1.default.DEV ? "http://localhost:8529" : ""
});
db.useDatabase("_system");
db.useBasicAuth("root", "");
var OP = constants_1.default.DEV ? "dev" : "prod";
var entColl = db.collection(constants_1.default.entCollectionName);
var relColl = db.collection(constants_1.default.relCollectionName);
var getEntityUpdates = function (datasetEntities, datasetId) { return __awaiter(_this, void 0, void 0, function () {
    var newEntities, existingEntities, _i, datasetEntities_1, entity, entityDatasetId, cursor, dbEntity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newEntities = [];
                existingEntities = [];
                _i = 0, datasetEntities_1 = datasetEntities;
                _a.label = 1;
            case 1:
                if (!(_i < datasetEntities_1.length)) return [3 /*break*/, 7];
                entity = datasetEntities_1[_i];
                // Make sure we have access to the entity ID in this dataset.
                if (!entity.ds || !entity.ds[datasetId]) {
                    console.error("The dataset loader didn't include the proper origin ID.");
                    return [3 /*break*/, 6];
                }
                entityDatasetId = entity.ds[datasetId];
                return [4 /*yield*/, db.query(arangojs_1.aql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        FOR entity IN ", "\n          FILTER entity.ds.", " == ", "\n          RETURN entity\n      "], ["\n        FOR entity IN ", "\n          FILTER entity.ds.", " == ", "\n          RETURN entity\n      "])), entColl, datasetId, entityDatasetId), { count: true })];
            case 2:
                cursor = _a.sent();
                if (!(cursor.count > 1)) return [3 /*break*/, 3];
                // Just abort for now. If it ever happens, we'll log the problems.
                throw new Error("Duplicate entities for " + entityDatasetId);
            case 3:
                if (!(cursor.count == 1)) return [3 /*break*/, 5];
                console.log("Found a correspondance for:", entity.name);
                return [4 /*yield*/, cursor.next()];
            case 4:
                dbEntity = _a.sent();
                if (!consistency_1.areConsistent(dbEntity, entity, ["type"])) {
                    // If we detect a fundamental consistency problem with an
                    // existing entity, we just abort for now.
                    // If the name is different, update the name? Only for some datasets?
                    throw new Error("Inconsistent entities");
                }
                existingEntities.push(dbEntity);
                return [3 /*break*/, 6];
            case 5:
                newEntities.push(entity);
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, { newEntities: newEntities, existingEntities: existingEntities }];
        }
    });
}); };
/**
 * Search for entities similar to the ones in the dataset
 * and asks the user if he wants to merge them.
 * @param  datasetEntities from the dataset we're importing
 * @param  datasetId       the id of this dataset
 * @return                 The entities judged similar by the user and ready to be saved
 */
var findSimilarEntities = function (datasetEntities, datasetId) { return __awaiter(_this, void 0, void 0, function () {
    var similarEntities, _i, datasetEntities_2, entity, cursor, dbEntity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                similarEntities = [];
                _i = 0, datasetEntities_2 = datasetEntities;
                _a.label = 1;
            case 1:
                if (!(_i < datasetEntities_2.length)) return [3 /*break*/, 7];
                entity = datasetEntities_2[_i];
                // Make sure we have access to the entity ID in this dataset.
                if (!entity.ds || !entity.ds[datasetId]) {
                    console.error("The dataset loader didn't include the proper origin ID for" +
                        entity.name);
                    return [3 /*break*/, 6];
                }
                return [4 /*yield*/, db.query(arangojs_1.aql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        FOR entity IN ", "\n          FILTER entity.ds.", " == null\n          FILTER entity.name LIKE ", " OR ", " LIKE entity.name\n          RETURN entity\n      "], ["\n        FOR entity IN ", "\n          FILTER entity.ds.", " == null\n          FILTER entity.name LIKE ", " OR ",
                        " LIKE entity.name\n          RETURN entity\n      "])), entColl, datasetId, entity.name, entity.name), { count: true })];
            case 2:
                cursor = _a.sent();
                if (cursor.count > 1) {
                    console.log("=========================================");
                    console.log("WARNING: multiple similar entities found!");
                    console.log("=========================================");
                }
                _a.label = 3;
            case 3:
                if (!cursor.hasNext()) return [3 /*break*/, 6];
                return [4 /*yield*/, cursor.next()];
            case 4:
                dbEntity = _a.sent();
                console.log("Found " + cursor.count + " similar entities:");
                console.log(entity);
                console.log("... is similar to ...");
                console.log(dbEntity);
                return [4 /*yield*/, ask_1.default("Merge them together?")];
            case 5:
                if (_a.sent()) {
                    // Check that we aren't merging incompatible stuff.
                    if (!consistency_1.areConsistent(dbEntity, entity, ["type"])) {
                        throw new Error("Inconsistent entities");
                    }
                    // Link the database entity (by merging, because we might be using
                    // multiple datasetIds in one operation)
                    dbEntity.ds = Object.assign({}, dbEntity.ds, entity.ds);
                    similarEntities.push(dbEntity);
                }
                return [3 /*break*/, 3];
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, similarEntities];
        }
    });
}); };
/**
 * The main process
 */
var updateMediasFrancais = function () { return __awaiter(_this, void 0, void 0, function () {
    var patchedEntities, postedEntities, dataset, entitiesToPatch, updates, allEntities, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                patchedEntities = [];
                postedEntities = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 12, , 13]);
                return [4 /*yield*/, loadMF_1.default];
            case 2:
                dataset = _a.sent();
                console.log(dataset.length + " entities loaded.");
                // First of all, we search existing entities in the database that
                // could be similar to the ones we have in the dataset.
                // We save thoses "merges" back to the database BEFORE checking which
                // entities already exists in the database
                console.log("🔍🔍🔍 Searching similar entities:");
                return [4 /*yield*/, findSimilarEntities(dataset, "mfid")];
            case 3:
                entitiesToPatch = _a.sent();
                console.log("==== Entities to patch: ====");
                console.log(entitiesToPatch);
                if (!(entitiesToPatch.length > 0)) return [3 /*break*/, 6];
                console.log("==== PATCHing entities ====");
                return [4 /*yield*/, api_1.default
                        .patch("/entities", entitiesToPatch)
                        .then(function (res) {
                        var potentialError = api_1.checkResponse(res);
                        if (potentialError)
                            throw potentialError;
                        else
                            return res.data;
                    })
                        .catch(function (error) {
                        throw error;
                    })];
            case 4:
                patchedEntities = _a.sent();
                return [4 /*yield*/, saveJSON_1.default("logs/" + OP + "-" + Date.now() + "-patch-entities.json", patchedEntities)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, getEntityUpdates(dataset, "mfid")];
            case 7:
                updates = _a.sent();
                console.log("==== Entities already in the DB: ====");
                console.log(updates.existingEntities.length + "/" + dataset.length);
                //console.log(updates.existingEntities);
                console.log("==== Entities to POST: ====");
                console.log(updates.newEntities);
                if (!(updates.newEntities.length > 0)) return [3 /*break*/, 10];
                console.log("==== POSTing entities ====");
                return [4 /*yield*/, api_1.default
                        .post("/entities", updates.newEntities)
                        .then(function (res) {
                        var potentialError = api_1.checkResponse(res);
                        if (potentialError)
                            throw potentialError;
                        else
                            return res.data;
                    })
                        .catch(function (error) {
                        throw error;
                    })];
            case 8:
                postedEntities = _a.sent();
                return [4 /*yield*/, saveJSON_1.default("logs/" + OP + "-" + Date.now() + "-post-entities.json", postedEntities)];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                allEntities = Object.assign({}, utils_1.getKeyObject(patchedEntities, "_key"), utils_1.getKeyObject(updates.existingEntities, "_key"), utils_1.getKeyObject(postedEntities, "_key"));
                console.log("===== Done importing entities =====");
                return [4 /*yield*/, saveJSON_1.default("logs/" + OP + "-" + Date.now() + "-allEntities.json", allEntities)];
            case 11:
                _a.sent();
                return [3 /*break*/, 13];
            case 12:
                err_1 = _a.sent();
                console.error("ERROR: Failed to load and update the dataset:");
                if (err_1 && err_1.stack)
                    console.error(err_1.stack);
                else
                    console.error(err_1);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
updateMediasFrancais();
var templateObject_1, templateObject_2;
