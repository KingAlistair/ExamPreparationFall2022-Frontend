const table = document.querySelector('.table')
const addMemberButton = document.querySelector('.add-member-btn')
const firstNameTag = document.getElementById('firstName')
const lastNameTag = document.getElementById('lastName')
const streetTag = document.getElementById('street')

const url = 'http://localhost:8080/members'

let firstName = ''
let lastName = ''
let street = ''
firstNameTag.addEventListener("change", (event) => {
    firstName = event.target.value
});
lastNameTag.addEventListener("change", (event) => {
    lastName = event.target.value
});
streetTag.addEventListener("change", (event) => {
    street = event.target.value
});


getMembers()

function getMembers() {
    fetch(url)
        .then((Response) => Response.json())
        .then((members) => {
            console.log(members)

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

                tableRow.append(tdId, tdFirstName, tdLastName, tdStreet, tdDeleteButton);
                table.appendChild(tableRow);
            });
        });
}


addMemberButton.addEventListener('click', () => {

            fetch(url, {

                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    street: street
                }),
            })
                .then((response) => response.json())


    }
)
