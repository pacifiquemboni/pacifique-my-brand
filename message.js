let messagedata = [
  {
    id: 10,
    name: "pacifique",
    email: "pacifiquemboni@gmail.com",
    message: "i need to hire you mr developer",
  },
];

function readMessage() {
  localStorage.setItem("smsobject", JSON.stringify(messagedata));
  var tabledata = document.getElementById("message-table");

  var objectdata = JSON.parse(localStorage.getItem("smsobject"));
  var smselements = "";

  if (objectdata.length == 0) {
    document.getElementById("smsError").innerHTML = "There is no messages";
    return;
  }
  objectdata.forEach((record) => {
    smselements += ` <tr>
              <td>${record.name}</td>
              <td>${record.email}</td>
              <td>${record.message}</td>
              <td class="action-buttons">
                <img src="images/formicon/reply.png" alt="" onclick="edit(${record.id})">
                <img src="images/formicon/Trash.png" alt=""onclick="delet(${record.id})">
              </td>

              </tr>
      `;
  });
  tabledata.innerHTML = smselements;
}
