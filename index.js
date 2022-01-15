const contacts = require("./contacts.js");
const { program } = require("commander");
program
  .option("-a, --action <type>", "contacts action")
  .option("--id, <type>", "contacts id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
program.parse(process.argv);
const argv = program.opts();

// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// const argv = require("yargs").argv;
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
//invokeAction({action:'get', id:"1"})
// invokeAction({ action: "list" });
// invokeAction({
//   action: "add",
//   name: "Harry",
//   email: "harry@vestibul.co.uk",
//   phone: "(982) 914-3002",
// });

// invokeAction({ action: "remove", id: "2" });
invokeAction(argv);
