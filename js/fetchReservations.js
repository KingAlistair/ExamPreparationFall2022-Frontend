const table = document.querySelector('.table')

const memberDropDown = document.querySelector('#member-dropdown')
const carDropDown = document.querySelector('#car-dropdown')
const reservationDate = document.querySelector('#reservationDate')
const addReservationButton = document.querySelector('#add-reservation-btn')

const urlReservation = 'http://localhost:8080/reservations'
const urlMember = 'http://localhost:8080/members'
const urlCar = 'http://localhost:8080/cars'

loadMemberDropdown()
loadCarDropdown()
getReservation()

async function getReservation() {
    await fetch(urlReservation)
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
                const tdCarId = document.createElement('td')
                tdCarId.innerHTML = reservation.car.id
                const tdCarBrandModel = document.createElement('td')
                tdCarBrandModel.innerHTML = reservation.car.brand + ' ' + reservation.car.model
                const  tdDeleteButton = document.createElement('td')
                const deleteButton = document.createElement('button')
                deleteButton.innerHTML = 'Delete'

                tdDeleteButton.addEventListener('click', async () => {

                    await fetch(urlReservation + '/' + reservation.id, {
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

                tdDeleteButton.appendChild(deleteButton)
                tableRow.append(tdId, tdReservationDate, tdRentalDate, tdMemberId, tdMemberName, tdCarId, tdCarBrandModel, tdDeleteButton)
                table.appendChild(tableRow)
            })
        })
}


async function loadMemberDropdown() {
    fetch(urlMember)
        .then((Response) => Response.json())
        .then((members) => {

            members.forEach((member) => {

                const option = document.createElement('option');
                option.value = member.id
                option.text = 'Id: ' + member.id + ', ' + member.firstName + ' ' + member.lastName;
                memberDropDown.add(option, 0);

            })
        })
}

async function loadCarDropdown() {
    await fetch(urlCar)
        .then((Response) => Response.json())
        .then((cars) => {

            cars.forEach((car) => {
                const option = document.createElement('option');

                option.value = car.id
                option.text = 'Id: ' + car.id + ', ' + car.brand + ' ' + car.model;
                carDropDown.add(option, 0);
            })
        })
}


addReservationButton.addEventListener('click', async () => {

    //Gets reservations with same car
    await fetch('http://localhost:8080/carReservations/' + carDropDown.value + '/' + reservationDate.value)
        .then((Response) => Response.json())
        .then((available) => {
            if (available) {
                addReservation()
            } else {
                alert('Car is not available for the date!')
                window.location.href = 'reservations.html'
            }
        })
})

async function addReservation() {

   await fetch(urlReservation, {

        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            reservationDate: reservationDate.value,
            member: {
                id: memberDropDown.value,
            },
            car: {
                id: carDropDown.value,
            }
        }),
    })
        .then((response) => response.json())
    alert('Reservation was added!')
    window.location.href = 'reservations.html'
}