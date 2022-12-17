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

const url = 'http://localhost:8080/reservations'


getReservation()

function getReservation() {
    fetch(url)
        .then((Response) => Response.json())
        .then((reservation) => {

            reservation.forEach((reservation) => {

                const tableRow = document.createElement('tr')

                const tdId = document.createElement('td')
                tdId.innerHTML = reservation.id;
                const tdReservationDate = document.createElement('td')
                tdReservationDate.innerHTML = reservation.reservationDate
                const tdRentalDate = document.createElement('td')
                tdRentalDate.innerHTML = reservation.rentalDate
                const tdMemberId = document.createElement('td')
                tdMemberId.innerHTML =  reservation.member.id
                const tdMemberFirstName = document.createElement('td')
                tdMemberFirstName.innerHTML = reservation.member.firstName
                const tdDeleteButton = document.createElement('button')
                tdDeleteButton.innerHTML = 'Delete'

                tdDeleteButton.addEventListener('click', () => {

                    fetch(url + '/' + reservation.id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(data => {
                            alert('Reservation was deleted')
                            window.location.href = 'members.html'
                        })
                        .catch(err => console.log(err))
                })

                tableRow.append(tdId, tdReservationDate,tdRentalDate,tdMemberId,tdMemberFirstName,tdDeleteButton)
                table.appendChild(tableRow)
            })
        })
}