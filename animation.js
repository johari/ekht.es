$(window).load(function() {

  var give_a_kiss = function () {
    var kisser = $("#nima")
    var kissee = $("#ekhtes")
    var kissee_position = kissee.position()
    var kisser_initial_position = kisser.position()

    $("#click").hide()

    $("#message").text("ekhtes jan!!")

    kisser.animate({left: kissee_position.left*0.8}, 1500, function() {
      var go_back = kisser.position()
      var new_pos = {left: kissee_position.left*0.875, top: kissee_position.top}

      $("#message").text(":* :* :*")

      kisser.animate(new_pos, 1000, function() {
        $("#love").position(kissee_position)
        $("#love").fadeIn(function () {
          kisser.animate(go_back, 1000, function() {
            kisser.animate(kisser_initial_position, 3000, function() {

              $("#message").text("tavalodet mobarak! <3 <3 <3")

              setTimeout(function() {
                $("#message").append("<br /><i>– nima</i>")
              }, 1500)
            })
          })
        })
      })
    })
  }

  var playing = false;
  $("#click").on("click", function() {
    if(playing == false) {
      playing = true
      give_a_kiss()
    }
  })

})
