const loadPhone = async (search='13', isShowAll)=> {
    const response = await fetch(`http://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await response.json();
    // console.log(data);
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
    // console.log(phones);
    //To show the phone step 1: is to get the id
    const phoneContainer = document.getElementById('phone-container');
    // to clear the phone search field use textContent or innerHTML
    phoneContainer.textContent = '';
    const showAll = document.getElementById('show-all');
    // console.log(phones.length);
    if(phones.length > 9 && !isShowAll){
        showAll.classList.remove('hidden');
    }else{
        showAll.classList.add('hidden');
    };
    // console.log('is showing', isShowAll);
    if(!isShowAll){
        phones = phones.slice(0, 9);
    }

    phones.forEach(phone => {
        // console.log(phone);
        //step 2: create a div
        const phoneHolder = document.createElement('div');
        phoneHolder.classList = `card w-96 bg-gray-100 shadow-xl`;
        //step 3: set innerHTML
        phoneHolder.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        </div>
        `;
        //step 4: append the div
        phoneContainer.appendChild(phoneHolder);
    });
    // hide loading indicator when data are set to show
    toggleLoading(false);
}

const handelerSearch = (isShowAll)=> {
    toggleLoading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
};
// const handelerSearch2 = ()=> {
//     toggleLoading(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// };

const toggleLoading = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowDetails = async (id)=>{
    // console.log('showDetails', id);
    // load single phone data
    const res = await fetch(`http://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;
    const showDetailContent = document.getElementById('show-detail-container');
    showDetailContent.innerHTML = `
    <img src="${phone.image}"/>
    <p><span>Storage :</span>${phone?.mainFeatures?.storage}</p>
    <p><span>chipSet :</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span>memory :</span>${phone?.mainFeatures?.memory}</p>
    <p><span>GPS :</span>${phone?.others?.GPS}</p>
    `
    // show the modal
    my_modal.showModal();
};
//  Handle show-all button
const handleShowAll = () => {
    handelerSearch(true);
};

loadPhone();