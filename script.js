const buttons = document.querySelectorAll(".add-btn");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalprice");

let total = 0;
let srNo = 1;

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

            return;
        }

        // Remove "No Added Item" message
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
    });
});