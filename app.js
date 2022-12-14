 // Put DOM elements into variables
 const myForm = document.querySelector('#my-form')
 const descriptionInput = document.querySelector('#description')
 const amountInput = document.querySelector('#amount')
 const categoriesInput = document.querySelector('#category')
 const msg = document.querySelector('.msg')
 const list = document.querySelector('#list')
 const updateBtn = document.querySelector('#update')
 
 const url = "https://crudcrud.com/api/b8c6afe814ce4537aa8401782589f549"
 
 window.onload = getData
 
 myForm.addEventListener('submit', onSubmit);
 
 function onSubmit(e) {
   e.preventDefault();
 
   if (descriptionInput.value === '' || amountInput.value === '') {
     // alert('Please enter all fields');
     msg.classList.add('alert')
     msg.innerHTML = 'Please enter all fields'
 
     // Remove error after 3 seconds
     setTimeout(() => msg.remove(), 3000)
   } else {
 
     let details = {
       amount : amountInput.value,
       desc : descriptionInput.value,
       category: categoriesInput.value
     }
     axios.post(url + "/expenses" ,details)
     .then(res =>showUser(res.data))
     .catch(err => {
         msg.classList.add('alert')
         msg.innerHTML = err
         // Remove error after 3 seconds
         setTimeout(() => msg.remove(), 3000)
     })
 
     amountInput.value = ''
     descriptionInput.value = ''
 
   }
 }
 
 
 function deleteItem(id) {
   axios.delete(`${url}/expenses/${id}`)
   .then(() => {
     list.removeChild(document.getElementById(id))
   })
   .catch(err => {
       msg.classList.add('alert')
       msg.innerHTML = err
       // Remove error after 3 seconds
       setTimeout(() => msg.remove(), 3000)
   })  
 
 }
 
 function edit(id) {
   let textArray = document.getElementById(id).firstElementChild.textContent.split('-')
   amountInput.value = textArray[0]
   descriptionInput.value = textArray[1]
   categoriesInput.value = textArray[2]
 
   updateBtn.disabled = false
   updateBtn.onclick = update(id)
 
 }
 
 function update(id) {
 
   axios.put(`${url}/expenses/${id}`, {
     amount : amountInput.value,
     desc : descriptionInput.value,
     category : categoriesInput.value 
   })
   .then(() => getData())
 
 }
 
 function getData() {
   axios.get(url + "/expenses")
   .then(res => {
     res.data.forEach(obj => showUser(obj))
   })
   .catch(err => {
       msg.classList.add('alert')
       msg.innerHTML = err
       // Remove error after 3 seconds
       setTimeout(() => msg.remove(), 3000)
   })
 
 }
 
 function showUser(details) {
   list.innerHTML = list.innerHTML + `<li class="list-group-item" id=${details._id}>
   <span>${details.amount} - ${details.desc} - ${details.category}</span>
  <button class="btn btn-danger" onclick=deleteItem('${details._id}')>X</button>
  <button class="btn btn-success" onclick="edit('${details._id}')">Edit</button></li> `
  }