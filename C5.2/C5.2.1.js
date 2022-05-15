const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const mainNode = xmlDOM.querySelector("list");
const num_of_stud = mainNode.getElementsByTagName("student");

function getInfo(i){
  const first_name = mainNode.getElementsByTagName("first")[i];
  const second_name = mainNode.getElementsByTagName("second")[i];
  const gen_name = first_name.textContent + ' ' + second_name.textContent;
  const stud_age = mainNode.getElementsByTagName("age")[i];
  const stud_prof = mainNode.getElementsByTagName("prof")[i];
  const language = mainNode.getElementsByTagName("name")[i].getAttribute("lang");
  const result = {
        name: gen_name,
        age: Number(stud_age.textContent),
        prof: stud_prof.textContent,
        lang: language
  }
  return result
};

const final_obj = {list: [
  getInfo(0),
  getInfo(1),
]}
      
console.log(final_obj)
