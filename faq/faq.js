function toggleAnswer(element) {
    // Toggle class 'active' to highlight the clicked item
    element.classList.toggle("active");

    // Toggle the display of the answer paragraph
    var answer = element.querySelector(".answer");
    answer.style.display = (answer.style.display === "block") ? "none" : "block";
}
