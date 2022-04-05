window.onload = function () {
    (() => {
        const x = {};
        x.room = 5; // количество комнат по умолчанию
        x.cleaning = 1; // ремонт
        x.footage = 150; // количество кв по умолчанию
        x.square = 35; // 1 Квадраьный метр 35 руб
        x.minimal = 150; // от какого квадоатного метра считать
        x.necessarily = ["name", "phone", "comment"]; // обязательные

        // выбор уборок
        x.cleanings = {
            1: { name: "Быстрая", summa: 0 },
            2: { name: "Генеральная", summa: 2000 },
            3: { name: "После ремонта", summa: 4000 },
        };

        // выбор комнат
        x.rooms = {
            1: { name: "1 комната", summa: 1500, text: "Уборка квартиры с 1 жилой комнатой" },
            2: { name: "2 комнаты", summa: 1900, text: "Уборка квартиры с 2 жилыми комнатами" },
            3: { name: "3 комнаты", summa: 2300, text: "Уборка квартиры с 3 жилыми комнатами" },
            4: { name: "4 комнаты", summa: 2900, text: "Уборка квартиры с 4 жилыми комнатами" },
            5: { name: "5+ комнат", summa: 5250, text: "Уборка квартиры или коттежджа" },
        };

        // Промо коды
        x.promocodes = {
            CLEAN2021: 10,
            CLEAN2022: 20,
        };

        // Список позиций
        x.other = {
            1: { name: "Количество санузлов", summa: 500, price: "500 ₽ / шт.", button: false, active: false, count: 0, info: "Мытье пола, обеспыливание поверхности (мытье окон не входит)", text: "Один санузел входит в базовую стоимость" },
            2: { name: "Мойка окон", summa: 500, price: "700 ₽ / шт.", button: false, active: false, count: 0, info: "Цена из расчета за стандартное окно 2 створки, целиком с двух сторон", text: "" },
            3: { name: "Холодильник/духовка", summa: 500, price: "700 ₽ / шт.", button: false, active: false, count: 0, info: "Удаление запахов и дезинфекция", text: "" },
            4: { name: "Микроволновка", summa: 500, price: "500 ₽ / шт.", button: false, active: false, count: 0, info: "Обезжиривание и очистка духового шкафа и/или СВЧ печи", text: "" },
            5: { name: "Мытье люстры", summa: 400, price: "400 ₽ / шт.", button: false, active: false, count: 0, info: "Указывайте только те люстры, которые висят на потолке", text: "" },
            6: { name: "Глажка", summa: 350, price: "350 ₽ / 30мин", button: false, active: false, count: 0, info: "Профессионально гладим одежду", text: "" },
            7: { name: "Поменять белье", summa: 400, price: "400 ₽ / шт.", button: false, active: false, count: 0, info: "Поменяем комплект белья оставленный вами в указанном месте", text: "" },
            8: { name: "Особые поручения", summa: 700, price: "700 ₽ / час.", button: false, active: false, count: 0, info: "Например: разложить вещи по цветам, сходить в магазин, отнести вещи в химчистку", text: "" },
            9: { name: "Уборка на балконе", summa: 500, price: "500 ₽ / шт.", button: false, active: false, count: 0, info: "Мытье пола, обеспыливание поверхностей на балконе (мойка окон не входит в стоимость)", text: "" },
            10: { name: "Эко-уборка", summa: "%40", price: "+ 40% к стоимости", button: true, active: false, count: 0, info: "Полная эко уборка квартиры - Ecover, Kiehl", text: "" },
            11: { name: "Доставка спец. оборудования", summa: 500, price: "500 ₽ к стоимости", button: true, active: false, count: 0, info: "Доставка строительного пылесоса и стремянки", text: "" },
            12: { name: "Парогенератор", summa: 700, price: "700 ₽ к стоимости", button: true, active: false, count: 0, info: "Отлично чистит межплиточные швы, дезинфицирует сантехнику, удаляет трудные загрязнения", text: "" },
            13: { name: "Заехать за ключами", summa: 300, price: "300 ₽ ", button: true, active: false, count: 0, info: "Если у вас совсем нет времени, мы поможем :)", text: "" },
        };

        let sendform = () => {
            out((j) => {
                // object с ответом

                console.log(j);
            });
        };
        let d = document;
        let с = d.getElementById("calculator");
        с.innerHTML = `<div class="c-title">Калькулятор</div> <div id="c-main" class="c-main" active-input='none'> <div class="c-left"> <div class="c-param" set-active="0"> <dl id="c-room"> <dt>Количество комнат</dt> <dd><em id="l-a-1" class="c-arrow-left"></em> <span id="t-a-1"></span> <em id="r-a-1" class="c-arrow-right"></em></dd> </dl> <dl id="c-cleaning"> <dt>Тип уборки</dt> <dd><em id="l-a-2" class="c-arrow-left"></em> <span id="t-a-2"></span> <em id="r-a-2" class="c-arrow-right"></em></dd> </dl> <dl id="c-meters"> <dt>Количество квадратных метров</dt> <dd><input id="t-a-3" type="number"> </dd> </dl> </div> <dl class="c-other"> <dt>Дополнительные услуги</dt> <ul id="c-other"> </ul> </dl> </div> <div class="c-right"> <div class="check"> <b></b> <ul id="check-list"> </ul> <p id="codebox">Промокод <span id="codeprome">CLEAN2021</span></p> <hr> <div id="c-total"></div> </div> <dl class="form" id="c-name"> <dt>Имя</dt> <dd><input id="t-a-4" placeholder="Ваше имя" > </dd> </dl> <dl class="form" id="c-phone"> <dt>Телефон</dt> <dd><input id="t-a-5" placeholder="+7(___)___-__-__" value="+7(___)___-__-__"> </dd> </dl> <dl class="form" id="c-datetime"> <dt>Дата уборки</dt> <div><dd id="c-date"><input type="date" id="t-a-9" > </dd><dd id="c-time"><input type="time" id="t-a-8" value=""> </dd></div> </dl> <dl class="form" id="c-promocode"> <dt>Промокод</dt> <dd><input id="t-a-6"> </dd> </dl> <dl class="form" id="c-comment"> <dt>Комментарий</dt> <dd><textarea placeholder="Комментарий" id="t-a-7"></textarea> </dd> </dl> <button id='sendform'>Заказать</button> </div>`;
        let clonName = (n, a) => {
            n = Math.abs(n) % 100;
            var n1 = n % 10;
            if (n > 10 && n < 20) {
                return a[2];
            }
            if (n1 > 1 && n1 < 5) {
                return a[1];
            }
            if (n1 == 1) {
                return a[0];
            }
            return a[2];
        };
        let out = (j) => {
            let e = false;
            let o = {};
            o.room = x.room;
            o.cleaning = x.cleaning;
            o.footage = x.footage;
            o.name = x.name;
            o.phone = x.phone;
            o.code = x.code;
            o.comment = x.comment;
            o.other = x.items;
            o.total = x.total;
            let a = { comment: "t-a-7", phone: "t-a-5", name: "t-a-4" };
            x.necessarily.forEach((i) => {
                if (o[i] == undefined || o[i] == "") {
                    e = true;
                    d.getElementById(a[i]).parentNode.style.border = "2px dashed #F44336";
                }
                if (i == "phone" && o.phone < 70000000000) {
                    e = true;
                    d.getElementById(a[i]).parentNode.style.border = "2px dashed #F44336";
                }
            });
            if (e) return;
            j(o);
        };
        let room = (s) => {
            if (s == "<") {
                if (x.room == 1) {
                    x.room = Object.keys(x.rooms).length;
                } else {
                    x.room -= 1;
                }
            } else {
                if (x.room == Object.keys(x.rooms).length) {
                    x.room = 1;
                } else {
                    x.room += 1;
                }
            }
            d.getElementById("c-meters").style.display = x.room == 5 ? "block" : "none";
            d.getElementById("c-main").setAttribute("active-input", "room");
            d.getElementById("t-a-1").textContent = x.rooms[x.room].name;
            calculator();
        };
        let cleaning = (s) => {
            if (s == "<") {
                if (x.cleaning == 1) {
                    x.cleaning = Object.keys(x.cleanings).length;
                } else {
                    x.cleaning -= 1;
                }
            } else {
                if (x.cleaning == Object.keys(x.cleanings).length) {
                    x.cleaning = 1;
                } else {
                    x.cleaning += 1;
                }
            }
            d.getElementById("c-main").setAttribute("active-input", "cleaning");
            d.getElementById("t-a-2").textContent = x.cleanings[x.cleaning].name;
            calculator();
        };
        let formatNumber = (number, decimals = 2, separator = ",", floatSeparator = ".") => {
            let stringified = number.toString();
            let [decimal, float] = stringified.split(".");
            let result = "";
            if (decimal.length > 2) {
                decimal = decimal.split("").reverse();
                for (let i = 0; i < decimal.length; i++) {
                    result += decimal[i];
                    if ((i + 1) % 3 === 0 && i !== decimal.length - 1) {
                        result += separator;
                    }
                }
            }
            result = result.split("").reverse().join("");
            if (float) {
                result += floatSeparator;
                if (float.length >= decimals) {
                    for (let i = 0; i < decimals; i++) {
                        result += float[i];
                    }
                } else {
                    for (let i = 0; i < decimals; i++) {
                        if (i < float.length) {
                            result += float[i];
                        } else {
                            result += "0";
                        }
                    }
                }
            }
            if (result == "") result = 0;
            return result;
        };
        let meters = (e) => {
            e.onkeyup = () => {
                if (e.value == "") {
                    e.value = 0;
                } else {
                    e.value = parseInt(e.value);
                }
                x.footage = e.value;
                calculator();
            };
            e.onkeydown = () => {
                e.value = parseInt(e.value);
                x.footage = e.value;
            };
            e.onclick = () => {
                d.getElementById("c-main").setAttribute("active-input", "meters");
            };
        };
        let name = (e) => {
            e.onkeyup = () => {
                e.parentNode.style.border = "2px dashed #249eff";
                x.name = e.value;
            };
            e.onclick = () => {
                e.parentNode.style.border = "2px dashed #249eff";
            };
            e.onblur = () => {
                e.parentNode.style.border = "2px dashed #e0e0e0";
            };
        };
        let phone = (e) => {
            e.onkeydown = (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            };
            function setCursorPosition(pos, elem) {
                elem.focus();
                if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
                else if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character", pos);
                    range.moveStart("character", pos);
                    range.select();
                }
            }
            function mask(event) {
                this.parentNode.style.border = "2px dashed #249eff";
                var matrix = this.defaultValue,
                    i = 0,
                    def = matrix.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, "");
                def.length >= val.length && (val = def);
                matrix = matrix.replace(/[_\d]/g, function (a) {
                    return val.charAt(i++) || "_";
                });
                this.value = matrix;
                x.phone = matrix.replace(/\D/g, "");
                i = matrix.lastIndexOf(val.substr(-1));
                i < matrix.length && matrix != this.defaultValue ? i++ : (i = matrix.indexOf("_"));
                setCursorPosition(i, this);
            }
            e.addEventListener("input", mask, false);
            e.onclick = () => {
                e.parentNode.style.border = "2px dashed #249eff";
            };
            e.onblur = () => {
                e.parentNode.style.border = "2px dashed #e0e0e0";
            };
        };
        let dateForm = (x, y) => {
            if (y === undefined) {
                y = x;
                x = new Date();
            } else {
                x = new Date(x);
            }
            let replaces = {
                yyyy: x.getFullYear(),
                yy: ("" + x.getFullYear()).slice(-2),
                mm: ("0" + (x.getMonth() + 1)).slice(-2),
                dd: ("0" + x.getDate()).slice(-2),
                HH: ("0" + x.getHours()).slice(-2),
                MM: ("0" + x.getMinutes()).slice(-2),
                SS: ("0" + x.getSeconds()).slice(-2),
            };
            for (const replace in replaces) {
                y = y.replace(replace, replaces[replace]);
            }
            return y;
        };
        x.date = dateForm("yyyy-mm-dd");
        x.time = dateForm("HH:MM");
        let comment = (t) => {
            function fixTextareaSize(t) {
                t.style.height = "auto";
                t.style.height = t.scrollHeight + 2 + "px";
                x.comment = t.value;
                t.parentNode.style.border = "2px dashed #249eff";
            }
            t.addEventListener("input", function (e) {
                fixTextareaSize(t);
            });
            t.onclick = () => {
                t.parentNode.style.border = "2px dashed #249eff";
            };
            t.onblur = () => {
                t.parentNode.style.border = "2px dashed #e0e0e0";
            };
        };
        let promocode = (e) => {
            e.onkeyup = () => {
                x.code = e.value;
                e.parentNode.style.border = "2px dashed #249eff";
                calculator();
            };
            e.onblur = () => {
                d.getElementById("t-a-6").parentNode.style.border = x.promocodes[x.code] != undefined ? "2px dashed #4CAF50" : "2px dashed #F44336";
            };
            e.onclick = () => {
                d.getElementById("c-main").setAttribute("active-input", "promocode");
            };
        };
        let ltime = (e) => {
            e.onchange = () => {
                x.time = e.value;
                calculator();
            };
            e.onclick = () => {
                d.getElementById("c-main").setAttribute("active-input", "time");
            };
        };
        let ldate = (e) => {
            e.onchange = () => {
                x.date = e.value;
                calculator();
            };
            e.onclick = () => {
                d.getElementById("c-main").setAttribute("active-input", "date");
            };
        };
        let calculator = () => {
            let t = d.querySelector(".check b");
            let s = "";
            let j = {};
            let total = 0;
            let procent = 0;
            let skd = 0;
            let list = d.getElementById("check-list");
            list.innerHTML = "";
            s = x.other[1].count != 0 ? `с ${x.other[1].count}${clonName(x.other[1].count, ["-им санузлом", "-мя санузлами", "-ю санузлами"])}` : "";
            total += x.cleanings[x.cleaning].summa;
            if (x.room == 5) {
                s = `${x.rooms[x.room].text} ${x.footage} кв.м ${s}. ${x.cleanings[x.cleaning].name}.`;
                if (x.footage > x.minimal) {
                    total += x.rooms[x.room].summa + (x.footage - x.minimal) * x.square;
                } else {
                    total += x.rooms[x.room].summa;
                }
            } else {
                s = `${x.rooms[x.room].text} и ${s}. ${x.cleanings[x.cleaning].name}.`;
                total += x.rooms[x.room].summa;
            }
            t.textContent = s;
            for (let i in x.other) {
                if (x.other[i].active) {
                    if (x.other[i].button) {
                        let at = "";
                        if (!isNaN(x.other[i].summa)) {
                            total += x.other[i].summa;
                            at = formatNumber(x.other[i].summa, 0, " ") + "₽";
                        } else {
                            procent += parseInt(x.other[i].summa.replace(/[^+\d]/g, ""));
                            at = "+" + procent + "%";
                        }
                        j[i] = { count: 1 };
                        let li1 = d.createElement("li");
                        let text1 = d.createElement("span");
                        text1.appendChild(d.createTextNode(x.other[i].name));
                        li1.appendChild(text1);
                        let ht1 = d.createElement("span");
                        ht1.appendChild(d.createTextNode("1шт"));
                        li1.appendChild(ht1);
                        let summ1 = d.createElement("span");
                        summ1.appendChild(d.createTextNode(at));
                        li1.appendChild(summ1);
                        let del1 = d.createElement("em");
                        del1.appendChild(d.createTextNode("отмена"));
                        del1.onclick = () => {
                            delite(i);
                        };
                        li1.appendChild(del1);
                        list.appendChild(li1);
                    } else {
                        let z = 0;
                        if (i == 1) {
                            z = x.other[i].summa * x.other[i].count - x.other[i].summa;
                        } else {
                            z = x.other[i].summa * x.other[i].count;
                        }
                        j[i] = { count: x.other[i].count };
                        let li = d.createElement("li");
                        let text = d.createElement("span");
                        text.appendChild(d.createTextNode(x.other[i].name));
                        li.appendChild(text);
                        let ht = d.createElement("span");
                        ht.appendChild(d.createTextNode(x.other[i].count + "шт"));
                        li.appendChild(ht);
                        let summ = d.createElement("span");
                        summ.appendChild(d.createTextNode(formatNumber(z, 0, " ") + "₽"));
                        li.appendChild(summ);
                        let del = d.createElement("em");
                        del.appendChild(d.createTextNode("отмена"));
                        del.onclick = () => {
                            delite(i);
                        };
                        li.appendChild(del);
                        list.appendChild(li);
                        total += z;
                    }
                }
            }
            if (procent != 0) {
                total += (total * procent) / 100;
            }
            if (x.promocodes[x.code] != undefined) {
                d.getElementById("codeprome").textContent = x.code;
                d.getElementById("codebox").style.display = "block";
                d.getElementById("t-a-6").parentNode.style.border = "2px dashed #4CAF50";
                skd = total;
                skd -= (total * x.promocodes[x.code]) / 100;
                d.getElementById("c-total").innerHTML = `К оплате <span>${formatNumber(skd, -1, " ")}₽</span><strike>${formatNumber(total, 0, " ")}₽</strike>`;
            } else {
                d.getElementById("c-total").innerHTML = `К оплате <span>${formatNumber(total, -1, " ")}₽</span>`;
            }
            x.total = total;
            x.items = j;
        };
        meters(d.getElementById("t-a-3"));
        name(d.getElementById("t-a-4"));
        phone(d.getElementById("t-a-5"));
        promocode(d.getElementById("t-a-6"));
        comment(d.getElementById("t-a-7"));
        ldate(d.getElementById("t-a-9"));
        ltime(d.getElementById("t-a-8"));
        let delite = (i) => {
            x.other[i].active = x.other[i].active == false ? true : false;
            d.getElementById("item_" + i).setAttribute("li-active", x.other[i].active);
            calculator();
        };
        let active = (e, i) => {
            x.other[i].active = x.other[i].active == false ? true : false;
            e.setAttribute("li-active", x.other[i].active);
            calculator();
        };
        let btnMinus = (e, i) => {
            if (x.other[i].count == 0) return;
            x.other[i].count -= 1;
            e.textContent = x.other[i].count;
            if (x.other[i].count == 0) {
                x.other[i].active = false;
            }
            d.getElementById("item_" + i).setAttribute("li-active", x.other[i].active);
            if (i == 1) toilet();
            calculator();
        };
        let btnPlus = (e, i) => {
            x.other[i].count += 1;
            e.textContent = x.other[i].count;
            x.other[i].active = true;
            d.getElementById("item_" + i).setAttribute("li-active", x.other[i].active);
            if (i == 1) toilet();
            calculator();
        };
        let toilet = () => {
            if (x.other[1].count > 0) {
                d.getElementById("price_1").classList.remove("c-group-text");
                d.getElementById("price_1").classList.add("c-group-price");
                d.getElementById("price_1").textContent = x.other[1].price;
            } else {
                d.getElementById("price_1").classList.add("c-group-text");
                d.getElementById("price_1").classList.remove("c-group-price");
                d.getElementById("price_1").textContent = x.other[1].text;
            }
        };
        let other = d.getElementById("c-other");
        d.getElementById("l-a-1").onclick = () => {
            room("<");
        };
        d.getElementById("l-a-2").onclick = () => {
            cleaning("<");
        };
        d.getElementById("r-a-1").onclick = () => {
            room(">");
        };
        d.getElementById("r-a-2").onclick = () => {
            cleaning(">");
        };
        d.getElementById("sendform").onclick = () => {
            sendform();
        };
        d.getElementById("t-a-1").textContent = x.room + "+ " + clonName(x.room, ["комната", "комнаты", "комнат"]);
        d.getElementById("t-a-2").textContent = x.cleanings[x.cleaning].name;
        d.getElementById("t-a-3").value = x.footage;
        d.getElementById("t-a-9").value = x.date;
        d.getElementById("t-a-8").value = x.time;
        for (let i in x.other) {
            let li = d.createElement("li");
            li.setAttribute("li-active", x.other[i].active);
            li.id = "item_" + i;
            let a = d.createElement("em");
            a.className = "btn-active";
            a.onclick = () => {
                active(li, i);
            };
            li.appendChild(a);
            let b = d.createElement("div");
            b.className = "c-group-tt";
            let c = d.createElement("div");
            c.className = "c-group-top";
            let name = d.createElement("span");
            name.className = "c-group-name";
            name.appendChild(d.createTextNode(x.other[i].name));
            c.appendChild(name);
            if (x.other[i].text != "") {
                let text = d.createElement("span");
                text.className = "c-group-text";
                text.id = "price_" + i;
                text.appendChild(d.createTextNode(x.other[i].text));
                c.appendChild(text);
            } else {
                let summ = d.createElement("span");
                summ.className = "c-group-price";
                summ.id = "price_" + i;
                summ.appendChild(d.createTextNode(x.other[i].price));
                c.appendChild(summ);
            }
            b.appendChild(c);
            let f = d.createElement("div");
            f.className = "c-group-bottom";
            if (x.other[i].button) {
                let button = d.createElement("span");
                button.className = "c-group-button";
                button.appendChild(d.createTextNode("Добавить"));
                button.onclick = () => {
                    active(li, i);
                };
                f.appendChild(button);
            } else {
                let minus = d.createElement("span");
                minus.className = "minus-btn";
                minus.appendChild(d.createTextNode("-"));
                f.appendChild(minus);
                let count = d.createElement("span");
                count.appendChild(d.createTextNode(x.other[i].count));
                f.appendChild(count);
                let plus = d.createElement("span");
                plus.className = "plus-btn";
                plus.appendChild(d.createTextNode("+"));
                f.appendChild(plus);
                plus.onclick = () => {
                    btnPlus(count, i);
                };
                minus.onclick = () => {
                    btnMinus(count, i);
                };
            }
            b.appendChild(f);
            li.appendChild(b);
            let info = d.createElement("span");
            info.className = "c-group-info-btn";
            info.appendChild(d.createTextNode("?"));
            let infoBlock = d.createElement("span");
            infoBlock.className = "info-block";
            let infoText = d.createElement("i");
            infoText.appendChild(d.createTextNode(x.other[i].info));
            infoBlock.appendChild(infoText);
            info.appendChild(infoBlock);
            li.appendChild(info);
            other.appendChild(li);
        }
        calculator();
    })();
};

