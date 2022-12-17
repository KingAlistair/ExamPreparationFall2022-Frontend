const table = document.querySelector('.table')

const memberDropDown = document.querySelector('#member-dropdown')
const reservationDate = document.querySelector('#reservationDate')
const addReservationButton = document.querySelector('#add-reservation-btn')

const url = 'http://localhost:8080/reservations'
const urlMember = 'http://localhost:8080/members'

loadDropdown()
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
                tdMemberId.innerHTML = reservation.member.id
                const tdMemberName = document.createElement('td')
                tdMemberName.innerHTML = reservation.member.firstName + ' ' + reservation.member.lastName
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
                            window.location.href = 'reservations.html'
                        })
                        .catch(err => console.log(err))
                })

                tableRow.append(tdId, tdReservationDate, tdRentalDate, tdMemberId, tdMemberName, tdDeleteButton)
                table.appendChild(tableRow)
            })
        })
}

function loadDropdown() {
    fetch(urlMember)
        .then((Response) => Response.json())
        .then((members) => {

            members.reverse().forEach((member) => {

                const option = document.createElement('option');
                option.value = member.id
                option.text = 'Id: ' + member.id + ', ' + member.firstName + ' ' + member.lastName;
                memberDropDown.add(option, 0);

            })
        })
}

addReservationButton.addEventListener('click', async () => {

    await fetch(urlMember + '/' +memberDropDown.value).then(response => response.json())

    fetch(url, {

        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            reservationDate: reservationDate.value,
            member: {
                id: memberDropDown.value,
            }
        }),
    })
        .then((response) => response.json())

})