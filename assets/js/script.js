$(document).ready(function () {
  $(".Thankyou-container").hide();

  var isUserDetails = sessionStorage.getItem("UserDetails");

  if (isUserDetails) {
    $(".contact-form").hide();
    $(".Thankyou-container").show();
  } else {
    $(".contact-form").submit(function (event) {
      event.preventDefault();

      var nameInput = $("#name").val();
      var emailInput = $("#email").val();
      var textareaInput = $("#message").val();

      if (!nameInput.trim()) {
        alert("Please enter your name.");
        return;
      }

      if (!validateEmail(emailInput)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!textareaInput.trim()) {
        alert("Please enter your thoughts.");
        return;
      }

      submitData();

      function submitData() {
        const formData = {
          name: nameInput,
          email: emailInput,
          message: textareaInput,
        };

        const scriptUrl =
          "https://script.google.com/macros/s/AKfycbwUfGP5FjrSfSsjLT8llnIMNhzspQZuopOLYYir-P7JsR6ENkJqIkv1_w1uNeJLa_8/exec";

        var csvData = new FormData();

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];

        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = months[currentDate.getMonth()];
        const year = currentDate.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        csvData.append("Date", formattedDate);
        csvData.append("Name", formData.name);
        csvData.append("Email", formData.email);
        csvData.append("Message", formData.message);

        fetch(scriptUrl, {
          method: "POST",
          body: csvData,
        })
          .then((response) => console.log("Success!", response))
          .catch((error) => console.error("Error!", error.message));

        $("#name").val("");
        $("#email").val("");
        $("#message").val("");

        sessionStorage.setItem("UserDetails", true);

        $(".contact-form").hide();
        $(".Thankyou-container").show();
      }
    });

    function validateEmail(email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
});
