$(window).load(function() {

  var lover = $("#lover")
  var loved_one = $("#loved_one")

  loved_one.css("right", 0)

  var lover_lips = lover.data("lips")
  var loved_one_lips = loved_one.data("lips")

  var kiss_position = {
    left: loved_one.position().left-(lover_lips[0]-loved_one_lips[0]),
    top: loved_one.position().top+(loved_one_lips[1]-lover_lips[1])
  }

  var give_a_kiss = function () {
    var loved_one_position = loved_one.position()

    $("#click").hide()

    var initial_position = loved_one_position.left;
    var last_position_in_animation = -1;

    var play_the_animation = function(the_list) {
      if(the_list.length == 0)
        return;

      var head = the_list[0]
      var tail = the_list.slice(1)

      var tl = parseFloat($(head).data("tl"))
      var desired_position = { left: initial_position*tl }

      var transition_time = 1000;
      if(last_position_in_animation == tl) {
        transition_time = 0
      }

      last_position_in_animation = tl

      $("#message").html($(head).html())
      var pause = parseFloat($(head).data("pause") || 1)

      var continue_animation = function() {
        lover.animate(desired_position, transition_time, function() {
          setTimeout(function() { play_the_animation(tail) }, pause*500)
        })
      }

      if($(head).data("action") == "kiss") {
        var lover_prev_position = lover.position();

        lover.animate(kiss_position, 1000, function() {
          $("#love").position(loved_one_position)
          $("#love").fadeIn()
          lover.animate(lover_prev_position, 1000, function() {
            continue_animation()
          })
        })
      } else {
        continue_animation()
      }
    }

    play_the_animation($("#scene span"))

  }

  var playing = false;
  $("#click").on("click", function() {
    if(playing == false) {
      playing = true
      give_a_kiss()
    }
  })

})
