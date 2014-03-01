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
    var lover_initial_position = lover.position()

    $("#click").hide()

    var initial_position = loved_one_position.left;
    var last_position_in_animation = false;

    var play_the_animation = function(the_list) {
      if(the_list.length > 0) {
        var head = the_list[0]
        var tail = the_list.slice(1)

        desired_position__the_number = initial_position*parseFloat($(head).data("tl"))
        var desired_position = {
          left: desired_position__the_number
        }

        var transition_time;
        if(last_position_in_animation == desired_position__the_number) {
          transition_time = 0
        } else {
          transition_time = 1000
        }
        last_position_in_animation = desired_position__the_number

        $("#message").html($(head).html())
        var pause = parseFloat($(head).data("pause") || 1)

        function queue_to_play_rest_of_animation() {
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
              queue_to_play_rest_of_animation()
            })
          })
        } else {
          queue_to_play_rest_of_animation()
        }
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
