const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear the phone container card before adding new cards
  phoneContainer.textContent = "";

  // display show all button if there is more than 12 phone
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log("is show all", isShowAll);

  // display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  // console.log(phones);
  phones.forEach((phone) => {
    // console.log(phone);
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
      <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-accent">Show Details</button>
      </div>
    </div> 
    `;
    phoneContainer.append(phoneCard);
  });
  toggleLoadingSpinner(false);
};

// search haldler
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("input-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

// handle show details
const handleShowDetail = async (id) => {
  console.log("show detail button clicked!", id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
};

showPhoneDetails = (phone) => {
  console.log(phone);

  const phoneDetailContainer = document.getElementById("show-detail-container");
  phoneDetailContainer.innerHTML = `
  <img class="my-4 mx-auto" src="${phone.image}" alt="" />
  <h3 class="font-bold text-lg">${phone.name}</h3>
  <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
   `;
  // show the modal
  show_details_modal.showModal();
};

loadPhone();
