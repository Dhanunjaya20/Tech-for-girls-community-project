$(document).ready(function () {
  let clickCount = 0;

  if (localStorage.getItem("formSubmitted") === "true") {
    $("#registrationForm input, #registrationForm button").prop("disabled", true);
    $("#message").text("🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!");
    return;
  }

  $("#whatsappShare").click(function () {
    if (clickCount < 5) {
      const message = "Hey Buddy, Join Tech For Girls Community!";
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
      window.open(whatsappLink, "_blank");

      clickCount++;
      $("#shareCount").text(`Click count: ${clickCount}/5`);

      if (clickCount === 5) {
        $("#whatsappShare").prop("disabled", true);
        $("#shareCount").text("✅ Sharing complete. Please continue.");
        $("#submitBtn").prop("disabled", false);
      }
    }
  });

  $("#registrationForm").submit(function (e) {
    e.preventDefault();

    if (clickCount < 5) {
      alert("Please complete WhatsApp sharing before submitting.");
      return;
    }

    const formData = new FormData(this);
    const scriptURL = "https://script.google.com/macros/s/AKfycbx6oaw8GzA34xrId3DTmiCV__cN9G5YjSREWt6iLv1YAQh1JFgdDfEnVLd-ik5bcKqMsg/exec";

    $("#submitBtn").prop("disabled", true);

    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
      .then(response => {
      if (response.ok) {
  localStorage.setItem("formSubmitted", "true");
  $("#registrationForm input, #registrationForm button").prop("disabled", true);
  $("#message").text("🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!");
  $("#registrationForm")[0].reset();
  animateSuccess(); // 👈 Add this
}

        } else {
          $("#message").text("❌ Something went wrong. Please try again.");
          $("#submitBtn").prop("disabled", false);
        }
      })
      .catch(error => {
        $("#message").text("❌ Submission failed. Please check your network or try again.");
        console.error("Error:", error);
        $("#submitBtn").prop("disabled", false);
      });
  });
// 🔄 Animate all buttons on hover
$("button").hover(
  function () {
    $(this).stop().animate({ opacity: 0.8, transform: 'scale(1.05)' }, 200);
  },
  function () {
    $(this).stop().animate({ opacity: 1, transform: 'scale(1)' }, 200);
  }
);

// ✅ Click bounce animation for buttons
$("button").click(function () {
  const btn = $(this);
  btn.animate({ paddingLeft: '20px' }, 100)
     .animate({ paddingLeft: '12px' }, 100);
});

// 🎉 Success animation after submit
function animateSuccess() {
  $("#submitBtn").css({ backgroundColor: "#4caf50" }); // green
  $("#submitBtn").fadeOut(200).fadeIn(200);
}
// ✨ Fancy hover animation with shadow glow
$("button").hover(
  function () {
    $(this).stop().animate({ boxShadow: '0 8px 20px rgba(233, 30, 99, 0.5)' }, 200);
  },
  function () {
    $(this).stop().animate({ boxShadow: '0 0 0 rgba(0,0,0,0)' }, 200);
  }
);

// 💥 Click ripple effect using jQuery (button bounce)
$("button").on("click", function () {
  const $btn = $(this);
  $btn.addClass("clicked");
  setTimeout(() => $btn.removeClass("clicked"), 200);
});

});
