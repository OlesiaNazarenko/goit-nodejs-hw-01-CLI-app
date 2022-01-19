const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../../db/contacts.json");
const removeContact = async (contactId, func) => {
  const contacts = await func();
  const contactByIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactByIndex === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(contactByIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
};
module.exports = {
  removeContact,
};
