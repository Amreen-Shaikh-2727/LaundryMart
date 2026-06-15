






emailjs.init("P0ZK1WIaoDZhQoM0B");

const buttons = document.querySelectorAll(".add-btn");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalprice");

const bookBtn = document.getElementById("bookBtn");
const bookMsg = document.getElementById("bookMsg");

let total = 0;
let srNo = 1;

// disable button initially
bookBtn.disabled = true;
bookBtn.style.backgroundColor = "#bdbdbd";
bookBtn.style.cursor = "not-allowed";

function updateBookButton() {
    const items = document.querySelectorAll("#cartItems .cart-items");

    if (items.length > 0) {
        bookBtn.disabled = false;
        bookBtn.style.backgroundColor = "rgba(149, 57, 180, 0.864)";
        bookBtn.style.cursor = "pointer";

        bookMsg.textContent = "You can now book your laundry service.";
        bookMsg.style.color = "green";
    } else {
        bookBtn.disabled = true;
        bookBtn.style.backgroundColor = "#bdbdbd";
        bookBtn.style.cursor = "not-allowed";

        bookMsg.textContent = "Note : Add Items before booking";
        bookMsg.style.color = "red";
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        const row = button.parentElement;
        const serviceText = row.querySelector("p").textContent;

        const serviceName = serviceText.split("-")[0].trim();

        const price = parseFloat(
            serviceText.match(/\$(\d+(\.\d+)?)/)[1]
        );

        // REMOVE ITEM
        if (button.classList.contains("added")) {

            const item = document.querySelector(
                `[data-service="${serviceName}"]`
            );

            if (item) {
                item.remove();
            }

            total -= price;
            totalPrice.textContent = `$${total}`;

            button.classList.remove("added");
            button.textContent = "Add Item +";
            button.style.backgroundColor = "";
            button.style.color = "";

            // Show empty cart message
            if (document.querySelectorAll("#cartItems .cart-items").length === 0) {
                cartItems.innerHTML = `
                    <p>📦</p>
                    <h3>No Added Item</h3>
                    <p>Add items from the cart services bar</p>
                `;
                cartItems.classList.add("not-added");
            }

            updateBookButton();
            return;
        }

        // Remove empty cart message
        if (cartItems.classList.contains("not-added")) {
            cartItems.innerHTML = "";
            cartItems.classList.remove("not-added");
        }

        const newItem = document.createElement("div");
        newItem.classList.add("cart-items");
        newItem.setAttribute("data-service", serviceName);

        newItem.innerHTML = `
            <p>${srNo}</p>
            <p>${serviceName}</p>
            <span>$${price}</span>
        `;

        cartItems.appendChild(newItem);

        total += price;
        totalPrice.textContent = `$${total}`;

        button.classList.add("added");
        button.textContent = "Remove Item";
        button.style.backgroundColor = "#ff4d4d";
        button.style.color = "white";

        srNo++;

        updateBookButton();
    });
});

// BOOK NOW
bookBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const nameInput = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const phoneInput = document.querySelector('input[type="tel"]');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(emailInput.value.trim())) {
    bookMsg.textContent = "Please enter a valid email address.";
    bookMsg.style.color = "red";
    return;
}

    if (
        nameInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        phoneInput.value.trim() === ""
    ) {
        bookMsg.textContent = "Please fill all fields.";
        bookMsg.style.color = "red";
        return;
    }

    emailjs.send(
    "service_e16g8r9",
    "template_vhtngep",
    {
        customer_name: nameInput.value,
        customer_email: emailInput.value,
        customer_phone: phoneInput.value,
        total_price: total
    }
)
.then(function () {

    bookMsg.textContent =
        "Booking confirmed! A confirmation email has been sent.";

    bookMsg.style.color = "green";

})
.catch(function (error) {

    console.log(error);

    bookMsg.textContent =
        "Failed to send confirmation email.";

    bookMsg.style.color = "red";

});

 

});
   const servicebtn = document.getElementById("bookServiceBtn");
    servicebtn.addEventListener("click", () => {
        document.getElementById("booking").scrollIntoView({
            behavior : "smooth"
        });
    })
;