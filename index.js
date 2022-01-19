const contacts = require("./controllers/contacts/index.js");
const { program } = require("commander");
program
  .option("-a, --action <type>", "contacts action")
  .option("--id, <type>", "contacts id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById.getContactById(
        id,
        contacts.listContacts.listContacts
      );
      if (!contact) {
        throw new Error("Contact with id not found");
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact.addContact(
        name,
        email,
        phone,
        contacts.listContacts.listContacts
      );
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact.removeContact(
        id,
        contacts.listContacts.listContacts
      );
      if (!removedContact) {
        throw new Error("Contact with id not found");
      }
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

(async () => {
  await invokeAction(argv);
})();
