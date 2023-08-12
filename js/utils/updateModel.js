//пользовательское событие

function updateModel(element, data) {
  return element.dispatchEvent(new CustomEvent("updateForm", { ...data }));
}

export default updateModel;
