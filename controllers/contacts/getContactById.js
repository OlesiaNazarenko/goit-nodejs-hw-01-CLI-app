const getContactById = async (contactId, func) => {
  const contacts = await func();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};
module.exports = {
  getContactById,
};
