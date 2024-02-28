const loadPhone = async (search, isShowAll)=> {
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
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
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

//  Handle show-all button
const handleShowAll = () => {
    handelerSearch(true);
};
// loadPhone();