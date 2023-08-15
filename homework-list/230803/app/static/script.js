{
    let tags = document.querySelectorAll("#tags > ul > li");
    for (let i = 0; i < tags.length; i++) {
        tags[i].addEventListener("click", () => {
            tags[i].classList.toggle("checked");
        });
    }
}
