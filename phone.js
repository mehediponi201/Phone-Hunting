const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhones(phones);
}
//loadPhone();

const displayPhones = phones => {
    //console.log(displayPhones); 
    // step-1: kothay add korbo eta age fixed kora
    const phoneContainer = document.getElementById('phone-container');
    // Clear phone container before adding new cards
    phoneContainer.textContent = '';
    // Display showAll Button if there are more then 20 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
      showAllContainer.classList.remove('hidden'); 
    } 
    else{
      showAllContainer.classList.add('hidden'); 
    }
    // Display only First ten phones
    phones = phones.slice(0,12);
    phones.forEach(phone => {
        console.log(phone);
        // 2.Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl p-5`;
        // step-3: set Inner html 
        phoneCard.innerHTML = `
               <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.phone_name }</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-center">
                    <button onclick="showPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                  </div>
                </div>
    `;
     // step-4: Append child 
     phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner 
    toggleLoadingSpinner(false);
} 

// handle search button
const handleSearch = () =>{ 
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field'); 
  const searchText = searchField.value ;
  console.log(searchText);
  loadPhone(searchText);
} 
// handle search recap
/* 
  const handleSearch2 = () =>{
  toggleLoadingSpinner(true);
  const searchField2 = document.getElementById('search-field2'); 
  const searchText2 = searchField2.value;
  console.log(searchText2); 
  loadPhone(searchText2);  
} 
*/

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner'); 
 if(isLoading){
  loadingSpinner.classList.remove('hidden');
 } 
 else{
  loadingSpinner.classList.add('hidden'); 
 }
} 

//handle show detail
const handleShowDetail = async(id) =>{
 // load single phone data 
 const res = await fetch(`https://openapi.programming-hero.com/api/phone/id`); 
 const data = res.json();
 const phone = data.data; 
 showPhoneDetails(phone);
} 

// show phone details 
const showPhoneDetails = (phone) =>{
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
 // show the modal 
 show_details_modal.showModal()
}
