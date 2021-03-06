import { arrayWithoutDuplicates } from "./utils";

const graphSelections = {
  benalla: [
    { "entityKey": "1991650" },
    { "entityKey": "1596059" },
    { "entityKey": "1595278" },
    { "entityKey": "1595373" },
    { "entityKey": "1572516" },
    { "entityKey": "1536437" },
    { "entityKey": "1589920" },
    { "entityKey": "1596198" },
    { "entityKey": "1990481" },
    { "entityKey": "1989895" },
  ],
  benalla2: [
    { "entityKey": "1589920" },
    { "entityKey": "1590013" },
    { "entityKey": "1994755" },
    { "entityKey": "1572516" },
    { "entityKey": "1589871" },
    { "entityKey": "1994103" },
    { "entityKey": "1536324" },
    { "entityKey": "1536431" },
    { "entityKey": "1990327" },
    { "entityKey": "567477" },
    { "entityKey": "1989897" },
    { "entityKey": "1989895" },
    { "entityKey": "1990981" },
    { "entityKey": "1991483" },
    { "entityKey": "1990481" },
    { "entityKey": "1536433" },
    { "entityKey": "1536437" },
    { "entityKey": "1596198" },
    { "entityKey": "1596059" },
    { "entityKey": "1595373" },
    { "entityKey": "1595278" },
  ],
  mediasfrancais: [
    { "entityKey": "1189568" },
    { "entityKey": "1189516" },
    { "entityKey": "1189502" },
    { "entityKey": "1189598" },
    { "entityKey": "1189774" },
    { "entityKey": "1189318" },
    { "entityKey": "1189284" },
    { "entityKey": "1189456" },
    { "entityKey": "1189596" },
    { "entityKey": "1189640" },
    { "entityKey": "1189258" },
    { "entityKey": "1189492" },
    { "entityKey": "1189780" },
    { "entityKey": "1189320" },
    { "entityKey": "1189386" },
    { "entityKey": "1189768" },
    { "entityKey": "1189646" },
    { "entityKey": "1189358" },
    { "entityKey": "1189458" },
    { "entityKey": "1189864" },
    { "entityKey": "1189758" },
    { "entityKey": "1189614" },
    { "entityKey": "1189494" },
    { "entityKey": "1189636" },
    { "entityKey": "1189292" },
    { "entityKey": "1189602" },
    { "entityKey": "1189802" },
    { "entityKey": "1189736" },
    { "entityKey": "1189406" },
    { "entityKey": "1189882" },
    { "entityKey": "1189710" },
    { "entityKey": "1189674" },
    { "entityKey": "1189280" },
    { "entityKey": "1189534" },
    { "entityKey": "1189532" },
    { "entityKey": "1189368" },
    { "entityKey": "1189400" },
    { "entityKey": "1189382" },
    { "entityKey": "1189834" },
    { "entityKey": "1189278" },
    { "entityKey": "1189762" },
    { "entityKey": "1189740" },
    { "entityKey": "1189714" },
    { "entityKey": "1189304" },
    { "entityKey": "1189472" },
    { "entityKey": "1189390" },
    { "entityKey": "1189782" },
    { "entityKey": "1189610" },
    { "entityKey": "1189442" },
    { "entityKey": "1189330" },
    { "entityKey": "1189716" },
    { "entityKey": "1189694" },
    { "entityKey": "1189520" },
    { "entityKey": "1189338" },
    { "entityKey": "1189384" },
    { "entityKey": "1189840" },
    { "entityKey": "1189294" },
    { "entityKey": "1189342" },
    { "entityKey": "1189656" },
    { "entityKey": "1189738" },
    { "entityKey": "1189626" },
    { "entityKey": "1189650" },
    { "entityKey": "1189392" },
    { "entityKey": "1189622" },
    { "entityKey": "1189462" },
    { "entityKey": "1189366" },
    { "entityKey": "1189486" },
    { "entityKey": "1189804" },
    { "entityKey": "1189836" },
    { "entityKey": "1189254" },
    { "entityKey": "1189672" },
    { "entityKey": "1189832" },
    { "entityKey": "1189748" },
    { "entityKey": "1189776" },
    { "entityKey": "1189410" },
    { "entityKey": "1189696" },
    { "entityKey": "1189660" },
    { "entityKey": "1189418" },
    { "entityKey": "1189800" },
    { "entityKey": "1189440" },
    { "entityKey": "1189438" },
    { "entityKey": "1189676" },
    { "entityKey": "1189388" },
    { "entityKey": "1189690" },
    { "entityKey": "1189642" },
    { "entityKey": "1189750" },
    { "entityKey": "1189634" },
    { "entityKey": "1189664" },
    { "entityKey": "1189290" },
    { "entityKey": "1189566" },
    { "entityKey": "1189730" },
    { "entityKey": "1189724" },
    { "entityKey": "1189556" },
    { "entityKey": "1189282" },
    { "entityKey": "1189256" },
    { "entityKey": "1189812" },
    { "entityKey": "1189572" },
    { "entityKey": "1189592" },
    { "entityKey": "1189276" },
    { "entityKey": "1189838" },
    { "entityKey": "1189618" },
    { "entityKey": "1189404" },
    { "entityKey": "1189570" },
    { "entityKey": "1189818" },
    { "entityKey": "1189846" },
    { "entityKey": "1189820" },
    { "entityKey": "1189286" },
    { "entityKey": "1189328" },
    { "entityKey": "1189688" },
    { "entityKey": "1189880" },
    { "entityKey": "1189546" },
    { "entityKey": "1189786" },
    { "entityKey": "1189408" },
    { "entityKey": "1189662" },
    { "entityKey": "1189684" },
    { "entityKey": "1189542" },
    { "entityKey": "1189778" },
    { "entityKey": "1189878" },
    { "entityKey": "1189590" },
    { "entityKey": "1189700" },
    { "entityKey": "1189670" },
    { "entityKey": "1189464" },
    { "entityKey": "1189344" },
    { "entityKey": "1189850" },
    { "entityKey": "1189466" },
    { "entityKey": "1189302" },
    { "entityKey": "1189428" },
    { "entityKey": "1189538" },
    { "entityKey": "1189300" },
    { "entityKey": "1189420" },
    { "entityKey": "1189666" },
    { "entityKey": "1189706" },
    { "entityKey": "1189876" },
    { "entityKey": "1189718" },
    { "entityKey": "1189746" },
    { "entityKey": "1189544" },
    { "entityKey": "1189454" },
    { "entityKey": "1189784" },
    { "entityKey": "1189612" },
    { "entityKey": "1189708" },
    { "entityKey": "1189252" },
    { "entityKey": "1189638" },
    { "entityKey": "1189588" },
    { "entityKey": "1189530" },
    { "entityKey": "1189732" },
    { "entityKey": "1189468" },
    { "entityKey": "1189756" },
    { "entityKey": "1189540" },
    { "entityKey": "1189360" },
    { "entityKey": "1189620" },
    { "entityKey": "1189816" },
    { "entityKey": "1189346" },
    { "entityKey": "1189518" },
    { "entityKey": "1189288" },
    { "entityKey": "1189514" },
    { "entityKey": "1189340" },
    { "entityKey": "1189560" },
    { "entityKey": "1189632" },
    { "entityKey": "1189810" },
    { "entityKey": "1189754" },
    { "entityKey": "1189726" },
    { "entityKey": "1189760" },
    { "entityKey": "1189702" },
    { "entityKey": "1189370" },
    { "entityKey": "1189574" },
    { "entityKey": "1189504" },
    { "entityKey": "1189814" },
    { "entityKey": "1189364" },
    { "entityKey": "1189692" },
    { "entityKey": "1189316" },
    { "entityKey": "1189624" },
    { "entityKey": "1189524" },
    { "entityKey": "1189630" },
    { "entityKey": "1189594" },
    { "entityKey": "1189322" },
    { "entityKey": "1189274" },
    { "entityKey": "1189728" },
    { "entityKey": "1189470" },
    { "entityKey": "1189842" },
    { "entityKey": "1189332" },
    { "entityKey": "1189788" },
    { "entityKey": "1189686" },
    { "entityKey": "1189668" },
    { "entityKey": "1189766" },
    { "entityKey": "1189752" },
    { "entityKey": "1189704" },
    { "entityKey": "1189576" },
    { "entityKey": "1189698" },
    { "entityKey": "1189648" },
    { "entityKey": "1189644" },
    { "entityKey": "1189490" },
    { "entityKey": "1189628" },
    { "entityKey": "1189616" },
    { "entityKey": "1189536" },
    { "entityKey": "1189488" },
    { "entityKey": "1189478" },
    { "entityKey": "1189526" },
    { "entityKey": "1189522" },
    { "entityKey": "1189372" },
    { "entityKey": "1189528" },
    { "entityKey": "1189658" },
    { "entityKey": "1189250" },
    { "entityKey": "1189856" },
    { "entityKey": "1189334" },
    { "entityKey": "1189844" },
    { "entityKey": "1189558" },
    { "entityKey": "1189564" },
    { "entityKey": "1189506" },
    { "entityKey": "1189496" },
    { "entityKey": "1189266" },
    { "entityKey": "1189586" },
    { "entityKey": "1189824" },
    { "entityKey": "1189446" },
    { "entityKey": "1189772" },
    { "entityKey": "1189314" },
    { "entityKey": "1189272" },
    { "entityKey": "1189452" },
    { "entityKey": "1189608" },
    { "entityKey": "1189326" },
    { "entityKey": "1189484" },
    { "entityKey": "1189380" },
    { "entityKey": "1189764" },
    { "entityKey": "1189356" },
    { "entityKey": "1189324" },
    { "entityKey": "1189448" },
    { "entityKey": "1189860" },
    { "entityKey": "1189744" },
    { "entityKey": "1189414" },
    { "entityKey": "1189606" },
    { "entityKey": "1189474" },
    { "entityKey": "1189378" },
    { "entityKey": "1189798" },
    { "entityKey": "1189734" },
    { "entityKey": "1189402" },
    { "entityKey": "1189244" },
    { "entityKey": "1189712" },
    { "entityKey": "1189654" },
    { "entityKey": "1189510" },
    { "entityKey": "1189362" },
    { "entityKey": "1189398" },
    { "entityKey": "1189828" },
    { "entityKey": "1189652" },
    { "entityKey": "1189460" },
    { "entityKey": "1189376" },
    { "entityKey": "1189432" },
    { "entityKey": "1189306" },
    { "entityKey": "1189682" },
    { "entityKey": "1189348" },
    { "entityKey": "1189436" },
    { "entityKey": "1189426" },
    { "entityKey": "1189444" },
    { "entityKey": "1189508" },
    { "entityKey": "1189336" },
    { "entityKey": "1189830" },
    { "entityKey": "1189562" },
    { "entityKey": "1189680" },
    { "entityKey": "1189822" },
    { "entityKey": "1189248" },
    { "entityKey": "1189580" },
    { "entityKey": "1189396" },
    { "entityKey": "1189394" },
    { "entityKey": "1189498" },
    { "entityKey": "1189416" },
    { "entityKey": "1189792" },
    { "entityKey": "1189866" },
    { "entityKey": "1189434" },
    { "entityKey": "1189582" },
    { "entityKey": "1189722" },
    { "entityKey": "1189262" },
    { "entityKey": "1189870" },
    { "entityKey": "1189412" },
    { "entityKey": "1189554" },
    { "entityKey": "1189312" },
    { "entityKey": "1189808" },
    { "entityKey": "1189604" },
    { "entityKey": "1189298" },
    { "entityKey": "1189826" },
    { "entityKey": "1189806" },
    { "entityKey": "1189260" },
    { "entityKey": "1189600" },
    { "entityKey": "1189872" },
    { "entityKey": "1189550" },
    { "entityKey": "1189268" },
    { "entityKey": "1189482" },
    { "entityKey": "1189548" },
    { "entityKey": "1189354" },
    { "entityKey": "1189770" },
    { "entityKey": "1189790" },
    { "entityKey": "1189848" },
    { "entityKey": "1189796" },
    { "entityKey": "1189422" },
    { "entityKey": "1189874" },
    { "entityKey": "1189584" },
    { "entityKey": "1189720" },
    { "entityKey": "1189246" },
    { "entityKey": "1189424" },
    { "entityKey": "1189678" },
    { "entityKey": "1189852" },
    { "entityKey": "1189308" },
    { "entityKey": "1189578" },
    { "entityKey": "1189350" },
    { "entityKey": "1189296" },
    { "entityKey": "1189862" },
    { "entityKey": "1189552" },
    { "entityKey": "1189858" },
    { "entityKey": "1189512" },
    { "entityKey": "1189270" },
    { "entityKey": "1189868" },
    { "entityKey": "1189794" },
    { "entityKey": "1189742" },
    { "entityKey": "1189374" },
    { "entityKey": "1189480" },
    { "entityKey": "1189476" },
    { "entityKey": "1189352" },
    { "entityKey": "1189310" },
    { "entityKey": "1189264" },
    { "entityKey": "1189500" },
    { "entityKey": "1189450" },
    { "entityKey": "1189430" },
    { "entityKey": "1189854" }
  ],
  trumpfamily: [
    { "entityKey": "1585177" },
    { "entityKey": "1585179" },
    { "entityKey": "1585171" },
    { "entityKey": "1585259" },
    { "entityKey": "1585175" },
    { "entityKey": "1585173" },
    { "entityKey": "1585163" },
    { "entityKey": "1585151" },
    { "entityKey": "571186" },
    { "entityKey": "1585153" },
    { "entityKey": "1585155" },
    { "entityKey": "1585161" },
    { "entityKey": "1585165" },
    { "entityKey": "222110" },
    { "entityKey": "1585143" },
    { "entityKey": "1585193" },
    { "entityKey": "1585137" },
    { "entityKey": "1585139" },
    { "entityKey": "1585145" },
    { "entityKey": "1585149" },
    { "entityKey": "1585133" },
    { "entityKey": "728123" },
    { "entityKey": "1585211" },
    { "entityKey": "728328" },
    { "entityKey": "728189" },
    { "entityKey": "728259" },
    { "entityKey": "727881" },
    { "entityKey": "726702" },
    { "entityKey": "1585141" },
    { "entityKey": "571598" },
    { "entityKey": "571755" },
    { "entityKey": "727169" },
  ],
};

export default graphSelections;
