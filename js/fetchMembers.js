const table = document.querySelector('.table')


const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const street = document.querySelector('#street')
const addMemberButton = document.querySelector('#add-member-btn')


const editForm = document.querySelector('#editForm')
const idToEdit = document.querySelector('#id-to-edit')
const editMemberButton = document.querySelector('#edit-member-btn')
const editFirstName = document.querySelector('#editFirstName')
const editLastName = document.querySelector('#editLastName')
const editStreet = document.querySelector('#editStreet')
const submitEdit = document.querySelector('#submit-edited-member-btn')

const url = 'http://localhost:8080/members'


getMembers()

function getMembers() {
    fetch(url)
        .then((Response) => Response.json())
        .then((members) => {

            members.forEach((member) => {

                const tableRow = document.createElement('tr')

                const tdId = document.createElement('td')
                tdId.innerHTML = member.id;
                const tdFirstName = document.createElement('td')
                tdFirstName.innerHTML = member.firstName
                const tdLastName = document.createElement('td')
                tdLastName.innerHTML = member.lastName
                const tdStreet = document.createElement('td')
                tdStreet.innerHTML = member.street
                const tdDeleteButton = document.createElement('button')
                tdDeleteButton.innerHTML = 'Delete'

                tdDeleteButton.addEventListener('click', () => {

                    fetch(url + '/' + member.id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(data => {
                            alert('Member was deleted')
                            window.location.href = 'members.html'
                        })
                        .catch(err => console.log(err))
                })

                tableRow.append(tdId, tdFirstName, tdLastName, tdStreet, tdDeleteButton,)
                table.appendChild(tableRow)
            })
        })
}


addMemberButton.addEventListener('click', () => {

        fetch(url, {

            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                street: street.value
            }),
        })
            .then((response) => response.json())

        alert("New member was added!")

    }
)

editMemberButton.addEventListener('click', () => {
    editForm.className = 'visible'
    fetchEdit()

    submitEdit.addEventListener('click',editMember)

})

async function fetchEdit() {
    const response = await fetch(url + '/' +idToEdit.value).then(response => response.json());
    editFirstName.value = response.firstName
    editLastName.value = response.lastName
    editStreet.value = response.street
}

async function editMember() {

    fetch(url + '/' + idToEdit.value, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": idToEdit.value,
            "firstName": editFirstName.value,
            "lastName": editLastName.value,
            "street": editStreet.value,
        })
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}