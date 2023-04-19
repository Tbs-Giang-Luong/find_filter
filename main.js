/** @format */

var mainForm = document.getElementById("form");

console.log({ mainForm });
function validator() {
    if (mainForm) {
        const formGroup = mainForm.querySelectorAll(".formElement");
        for (let i = 0; i < formGroup.length; i++) {
            // formGroup[i].onblur = function () {
            if (formGroup[i].value === "") {
                formGroup[i].parentElement.querySelector(".errorMessage").innerText =
                    "Have error";
            } else {
                formGroup[i].parentElement.querySelector(".errorMessage").innerText =
                    "";
            }

            // }
        }
    }
}

function renderUser() {
    let getValueStoreRage = localStorage.getItem("valueStudent")
        ? JSON.parse(localStorage.getItem("valueStudent"))
        : [];

    // let student = `
    //     <tr>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Address</th>
    //     </tr>

    // `;

    getValueStoreRage.map((value, index) => {
        let student = `
        <tr key= ${index}>
            <td>${index}</td>  
            <td>${value.name}</td>  
            <td>${value.address}</td>
            <td>    
                <button onclick='handleEdit(${index})'>Edit</button>
                <button onclick= 'handleDelete(${index})'>Delete</button>
            </td>
        </tr>
    `;
        document.querySelector(".table").innerHTML += student;
    });
}

function handleEdit(index) {
    document.querySelector(".getIndex").value = index;
    let getValueStoreRage = localStorage.getItem("valueStudent")
        ? JSON.parse(localStorage.getItem("valueStudent"))
        : [];

    let name = (document.querySelector("#name").value =
        getValueStoreRage[index].name);
    let address = (document.querySelector("#address").value =
        getValueStoreRage[index].address);

    document.querySelector(".create").style.display = "none";

    // renderUser()
}

function handleUpdate() {
    const index = document.querySelector(".getIndex").value;
    console.log(index)
    let getValueStoreRage = localStorage.getItem("valueStudent")
        ? JSON.parse(localStorage.getItem("valueStudent"))
        : [];

    getValueStoreRage[index] = {
        name: document.querySelector("#name").value,
        address: document.querySelector("#address").value,
    };

    localStorage.setItem("valueStudent", JSON.stringify(getValueStoreRage));
    document.querySelector(".update").style.display = "none";
    document.querySelector(".create").style.display = "block";
    renderUser();
}

function handleDelete(index) {
    let getValueStoreRage = localStorage.getItem("valueStudent")
        ? JSON.parse(localStorage.getItem("valueStudent"))
        : [];
    getValueStoreRage.splice(index, 1)

    localStorage.setItem("valueStudent", JSON.stringify(getValueStoreRage))
    renderUser()



}

function submit() {
    validator();
    let arrError = [];
    let errorElement = mainForm.querySelectorAll(".errorMessage");
    for (let i = 0; i < errorElement.length; i++) {
        arrError.push(errorElement[i].innerText);
    }
    let checkErrorElement = arrError.every((value) => value === "");

    if (checkErrorElement) {
        const listStudent = localStorage.getItem("valueStudent")
            ? JSON.parse(localStorage.getItem("valueStudent"))
            : [];
        let name = document.getElementById("name").value;
        let address = document.getElementById("address").value;
        listStudent.push({
            name: name,
            address: address,
        });

        localStorage.setItem("valueStudent", JSON.stringify(listStudent));
    } else {
        console.log("error");
    }
    renderUser();
}
