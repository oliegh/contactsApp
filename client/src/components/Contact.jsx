export const Contact = ({ contacts }) => {

  return (
    <div class="collection">
      {!!contacts.length
        ? contacts.map((contact, index) => (
          <a href="#!" class="collection-item" key={index}>{`${contact.name} ${contact.phone} ${contact.email}`}</a>
        ))
        :
        <h3>Контактов не найдено</h3>
      }
    </div>
  )
}