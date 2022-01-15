const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { v4 } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactByIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactByIndex === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(contactByIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
};

const addContact = async (name, email, phone) => {
  const data = { id: v4(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(data);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
