(function(){
    var template = '<ul class="pagination">'+
                        '<li v-if="current!=1">'+
                            '<a @click="linkLeft(current)">&lt;</a>'+
                        '</li>'+
                        '<li v-for="turn in turns" :class="{ active: current == turn }">'+
                            '<a @click="linkTurn(turn)">{{ turn }}</a>'+
                        '</li>'+
                        '<li v-if="current!=all">'+
                            '<a @click="linkRight(current)">&gt;</a>'+
                        '</li>'+
                        '<li class="all">'+
                            '<a>共<i>{{all}}</i>页</a>'+
                        '</li>'+
                        '<li v-if="all>10">'+
                            '<input class="number" type="number" name="points" min="0" :max="all" v-model.number="turnBtn"/>'+
                            '<input class="button" type="button" value="跳转" @click="linkTurnBtn(turnBtn)"/>'+
                        '</li>'+
                    '</ul>'
    var pagination = Vue.extend({
        template: template,
        data: function(){
            return {
                turnBtn: ''     // 跳转
            }
        },
        props: {
            all: {
                type: Number,
                required: true
            },
            current: {
                type: Number,
                required: true
            },
            left: {
                type: Function,
                default: function (left) {
                    // to do
                }
            },
            right: {
                type: Function,
                default: function (right) {
                    // to do
                }
            },
            turn: {
                type: Function,
                default: function (turn) {
                    // to do
                }
            }
        },
        computed: {
            turns() {
                var left = 1;
                var right = this.all;
                var arr = [];
                if (this.all >= 11) {
                    if (this.current > 5 && this.current < this.all - 4) {
                        left = this.current - 5;
                        right = this.current + 4;
                    } else {
                        if (this.current <= 5) {
                            left = 1;
                            right = 10;
                        } else {
                            right = this.all;
                            left = this.all -9;
                        }
                    }
                }
                while (left <= right) {
                    arr.push(left);
                    left++;
                }   
                return arr;
            }
        },
        methods: {
            linkLeft(left) {
                this.left(left);
            },
            linkRight(right) {
                this.right(right);
            },
            linkTurn(turn) {
                if (turn != this.current) {
                    this.turn(turn);
                }
            },
            linkTurnBtn(turn) {
                var turn = parseInt(turn);
                if (0<turn && turn<=this.all) {
                    this.linkTurn(turn);
                }
            }
        }
    });
    window.vuePagination = pagination;
}());