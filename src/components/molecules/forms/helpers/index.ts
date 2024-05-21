export function scrollToError(error) {
  setTimeout(() => {
    const errorList: NodeListOf<HTMLElement> = document.querySelectorAll(
      '.ui-form .ui-list-item div.error, .required'
    );
    if (errorList.length >= 0) {
      const elOffset = errorList[0]?.offsetTop;
      const elHeight = errorList[0]?.offsetHeight;
      const windowHeight = window.innerHeight;

      let offset;

      if (elHeight < windowHeight) {
        offset = elOffset - (windowHeight / 2 - elHeight / 2);
      } else {
        offset = elOffset;
      }

      window.scrollTo(0, offset);
    }
  }, 0);
}
