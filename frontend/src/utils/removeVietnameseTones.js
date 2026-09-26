function removeVietnameseTones(text) {
    text = text.replace(/[đĐ]/g, "d");
    text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return text;
}

export default removeVietnameseTones;