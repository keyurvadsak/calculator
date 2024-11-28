let val1 = 0;
let val2 = 0;
let arithmatic = "";
let last_operater = "";
let escapeCount = 0;

$(document).ready(function () {
    $('button.arithmatic').click(function () {
        $(this).addClass('selected');
    });
    $('button.C').click(function () {
        $('button').removeClass('selected');
        $(this).addClass('selected');
    });
    $('button.AC').click(function () {
        $('button').removeClass('selected');
        $(this).addClass('selected');
    });

    $(document).keydown(function (evt) {
        if (evt.key == '1' || evt.key == '2' || evt.key == '3' || evt.key == '4' || evt.key == '5' || evt.key == '6' || evt.key == '7' || evt.key == '8' || evt.key == '9' || evt.key == '0') {
            number(evt.key);
        }
        else if (evt.key == '+' || evt.key == '-' || evt.key == '*' || evt.key == '/' || evt.key == '%') {
            arithmaticOperaters(evt.key)
        } else if (evt.key == 'Enter') {
            Equalsto();
        }
        else if (evt.key == 'Escape') {
            escapeCount++;
            if (escapeCount == '2') {
                ACButton();
            }setTimeout(function () {
                escapeCount = 0;
            }, 800);
        }
        else if (evt.key == 'Backspace') {
            CButton();
        }
    });
});

function number(number) {
    $('.display').val($('.display').val() + number);
    $('button.C').removeClass('selected');
    $('button.AC').removeClass('selected');
    $('.arithmaticEquals').removeClass('selected');
}

function CButton() {
    $('button').removeClass('selected');
    $('.C').addClass('selected');
    $('.display').val($('.display').val().slice(0, -1));
};

function ACButton() {
    $('.display').val('');
    val1 = 0;
    val2 = 0;
    arithmatic = "";
    $('button').removeClass('selected');
    $('.second-display').val("");
    $('.AC').addClass('selected');
};

function arithmaticOperaters(operater) {
    $(this).addClass('selected');
    if (val1 == 0) {
        val1 = $('.display').val();
        arithmatic = operater;
        if (arithmatic == '%') {
            val1 = Number(val1 / 100);
            $('.display').val(val1);
            arithmatic = "";
        }
        $('.second-display').val(val1 + " " + arithmatic);
        $('.display').val('');
    }
    else {
        val2 = $('.display').val();
        if (operater == '%') {
            if (arithmatic == '+' || arithmatic == '-') {
                val2 = val1 * val2 / 100;
            }
            else if (arithmatic == '*' || arithmatic == '/') {
                val2 = val2 / 100;
            }
            last_operater = '%';
            $('.second-display').val(val1 + " " + arithmatic + " " + val2);
            $('.display').val("");
        } else {
            display = calculation(val1, val2, arithmatic);
            arithmatic = operater;
            $('.second-display').val(display + " " + arithmatic);
            val1 = display;
            val2 = 0;
            $('.display').val("");
        }
    }
    $('button').removeClass('selected');
}
function Equalsto() {
    $('button').removeClass('selected');
    $('.arithmaticEquals').addClass('selected');
    if (last_operater == '%') {
        display = calculation(val1, val2, arithmatic);
        $('.second-display').val(val1 + " " + arithmatic + " " + val2 + " = " + display);
        $('.display').val("");
        val1 = display;
        last_operater = "";
    } else {
        val2 = $('.display').val();
        display = calculation(val1, val2, arithmatic);
        $('.second-display').val(val1 + " " + arithmatic + " " + val2 + " = " + display);
        $('.display').val("");
        val1 = display;
        arithmatic="";
    }
}
function calculation(val1, val2, arithmatic) {
    if (arithmatic == '+') {
        val1 = Number(val1) + Number(val2);
    } else if (arithmatic == '-') {
        val1 = Number(val1) - Number(val2);
        // val1 = Number(val1 - val2);
        
    } else if (arithmatic == '/') {
        val1 = Number(val1) / Number(val2);
    } else if (arithmatic == '*') {
        val1 = Number(val1) * Number(val2);
    }
    return val1;
}