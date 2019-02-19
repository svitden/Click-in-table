/*
Напишите программу, которая позволяет выбирать отдельные ячейки в наборе: при клике на ячейку она красится в черный цвет, при повторном клике - в белый:

При клике на кнопку Clear вся область очищается:
При клике на кнопку Clear вся область очищается::

Поле ячеек генерируется функцией, в которую передается количество ячеек по горизонтали и вертикали, а также элемент, в который ячейки будут нарисованы.

Кнопки стилизуются с помощью Bootstrap.

ET - 3 часа
AT - 5 часов  

*/
var current = null;
var saved = null;

function insertTable (vert, hor, selector) {
    
    current = new Array(vert).fill(0).map(() => new Array(hor).fill(0));
    
    selector = selector || 'body';
    
    $table = $('<table>').prependTo(selector);
    for (var i = 0; i < vert; i++) {
        var $tr = $('<tr>').appendTo($table);

        for (var j = 0; j < hor; j++) {
            $('<td>').appendTo($tr).css({
                'background-color': 'white',
                'border': '1px solid black',
                'width': '20px',
                'height': '20px'
            }).attr('id', 'cell' + i +'x'+j);            
        }
    }
}

insertTable(10, 10, '.table');

$(() => {

    $('td').click(function ()     
    {
        var rowNumber = $(this).parent().index();
        var columnNumber = $(this).index();
     
        if ($(this).css('background-color') === 'rgb(0, 0, 0)') {
            $(this).css({
                'background-color': 'white'
            });

            current[rowNumber][columnNumber] = 0;
     
         } else {
            $(this).css({
                'background-color': 'black'
            });
            
            current[rowNumber][columnNumber] = 1;   
        }
    });    

    document.querySelector('.clear').addEventListener('click', function () {              
        $('td').css({
            'background-color': 'white'
        });        
        
        saved = current;
        current = new Array(saved.length).fill(0).map(() => new Array(saved[0].length).fill(0));
    });
    
    document.querySelector('.restore').addEventListener('click', function () {    
        for (var i = 0; i < saved.length; i++) {
            for(var j = 0; j < saved[i].length; j++) {
                $('#cell'+i + 'x' + j).css(
                    saved[i][j] === 1 ?
                    {
                        'background-color': 'black'
                    }:
                        {
                            'background-color': 'white'
                        }
                )            
            }
        }
        current = saved;
    }); 

});

