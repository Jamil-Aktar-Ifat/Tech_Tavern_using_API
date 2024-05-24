const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear the phone container card before adding new cards
  phoneContainer.textContent = "";

  // display show all button if there is more than 12 phone
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // display only first 12 phones
  phones = phones.slice(0, 12);

  // console.log(phones);
  phones.forEach((phone) => {
    console.log(phone);
    /**
     * 1. get the html element
     * 2. create a div
     * 3. set inner html
     * 4. append child
     */
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-grey-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div> 
    `;
    phoneContainer.append(phoneCard);
  });
};

// search haldler
const handleSearch = () => {
  const searchField = document.getElementById("input-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
};

// loadPhone();
