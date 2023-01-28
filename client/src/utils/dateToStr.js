export const dateToStr = (date) => {
    const objectDate = new Date(date);
    const yyyy = objectDate.getFullYear();
    let mm = objectDate.getMonth() + 1;
    let dd = objectDate.getDate();
  
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
  
    const stringDate = dd + '.' + mm + '.' + yyyy;
  
    return stringDate;
  };
  