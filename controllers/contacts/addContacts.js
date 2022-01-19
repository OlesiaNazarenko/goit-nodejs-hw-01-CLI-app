const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "../../db/contacts.json");
const addContact = async (name, email, phone, func) => {
  const data = { id: v4(), name, email, phone };
  const contacts = await func();
  contacts.push(data);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return data;
};
module.exports = {
  addContact,
};
