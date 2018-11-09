const storage = window.localStorage

const renderContacts = () => {
    const contacts = JSON.parse(storage.getItem('contacts'))
    
    let div = document.querySelector('.contact-list')
    
    div.innerHTML = ''
    if (contacts) {
        
        const sect = document.createElement('section')
        sect.classList.add('flex');
        sect.classList.add('flex-col');
        sect.classList.add('justify-center');
        contacts.forEach(contact => {
            let sectChild = document.createElement('div')
            sectChild.innerHTML = `
            <div class="overflow-y-auto max-w-sm rounded shadow-lg text-white bg-black py-3 px-4 mb-3"> 
                <h3>${ contact.name }</h3>
                <h3>${ contact.company }</h3>
                <p>${ contact.notes }</p> 
                ${ contact.email } | 
              <a href="https://www.twitter.com/${ contact.twitter}">@${contact.twitter}</a>
           </div>
       `
        sect.appendChild(sectChild)
      })
  
      div.appendChild(sect) 
    } else { 
      div.innerHTML = '<p>You have no contacts in your address book</p>' 
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderContacts()
    
    const addContactForm = document.querySelector('.new-contact-form')
    
    addContactForm.addEventListener('submit', event => {
      event.preventDefault()
      const storage = window.localStorage
      
      const {
        name,
        email,
        phone,
        company,
        notes,
        twitter,
      } = addContactForm.elements
  
      const contact = {
        id: Date.now(),
        name: name.value,
        email: email.value,
        phone: phone.value,
        company: company.value,
        notes: notes.value,
        twitter: twitter.value,
      }
  
      let contacts = JSON.parse(storage.getItem('contacts')) || []
      contacts.push(contact)
      storage.setItem('contacts', JSON.stringify(contacts))
      renderContacts()
      addContactForm.reset()
    })
  })