const guessedNumber = document.getElementById("guessedNumber");
const guessButton = document.getElementById("guessButton");
const title = document.getElementById("title");
const container = document.getElementById("container");

let correctNumber = Math.floor(Math.random() * 100) + 1;
let health = 100;
let score = 100;

if (!localStorage.getItem("welcomePage")) {
    localStorage.setItem("welcomePage", "true")
}

if (localStorage.getItem("welcomePage")) {
    if (localStorage.getItem("welcomePage") == "true") {
        Swal.fire({
            title: "Welcome to Guess My Number",
            text: "This is a simple guessing game where you have to guess a number between 1 and 100.",
            icon: "info",
            confirmButtonText: "Start Game",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                Swal.showLoading();
            }
        }).then(result => {
            localStorage.setItem("welcomePage", "false")
        })
    }
}






function checkGuess(guess) {
    if (guess > 100 || guess < 1) {
        Swal.fire({
            title: "Invalid Input",
            text: "Please enter a number between 1 and 100.",
            icon: "error",
            confirmButtonText: "Ok"
        })
        return false;
    }
    if (guess == correctNumber) {
        Swal.fire({
            title: "Correct!",
            text: "",
            html:`
            <div>
                <h1>Your Score: ${score}</h1>
                <h1>You guessed the correct number!</h1>

            </div>
            `,
            icon: "success",
            confirmButtonText: "Play Again"


        }).then(result => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        })


        correctNumber = Math.floor(Math.random() * 100) + 1;
        return false;
    }
    else if (guess < correctNumber) {
        Swal.fire({
            title: "Too Low!",
            html: `
            <div>
            <h1>
            <img src="/hearticon.svg">
            : ${health}</h1>
            <h1>Your guess is too low.</h1>

            </div>
            `,
            icon: "error",
            confirmButtonText: "Ok"
        })
        score -= 15;
        health -= 15;
        return false;
    }
    else if (guess > correctNumber) {
        Swal.fire({
            title: "Too High!",
            html: `
            <div>
            <h1><img src="/hearticon.svg"> : ${health}</h1>
            <h1>Your guess is too high.</h1>

            </div>
            `,
            icon: "error",
            confirmButtonText: "Ok"
        })
        score -= 15;
        health -= 15;

        return false;
    }
    return true;
}

