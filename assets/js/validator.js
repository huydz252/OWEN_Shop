
console
//đối tượng Validator (xác nhận)
function Validator(options){    
    
    var formElement = document.querySelector(options.form);  

    var selectorRule = {};
 
    if(formElement){   
        
        //TRƯỜNG HỢP SUBMIT BẰNG Javascript:
        formElement.onsubmit = function(e){
            e.preventDefault(); //ngăn chặn việc submit mặc định của button(submit bằng HTML)
            
            var isFormValid = true;     //isFormValid: form có hợp lệ hay không? (đầy đủ thông tin hay không)
            
            //XÁC ĐỊNH XEM isFormValid = TRUE HAY FALSE (MẶC ĐỊNH LÀ TRUE (K CÓ LỖI))
            /*ý tưởng:  duyệt qua tất cả thẻ input trong rules bằng rule.selector (nơi lưu trữ các name id)
                        sau đó gọi hàm validate (hàm sẽ kiểm tra lỗi và có trả về có lỗi hay không (true-false))
                        kết quả của hàm validate đó ta gán cho biến có tên isValid,
                        xét nếu isValid = true (có lỗi) thì gán isFormValid = false (form không hợp lệ)
                */
            options.rules.forEach(function(rule){
                         
                var inputElements = formElement.querySelectorAll(rule.selector); //lấy thẻ input đang được click vào
                Array.from(inputElements);
                inputElements.forEach(inputElement => {
                    isValid = validate(inputElement, rule);
                    if(!isValid){    
                        isFormValid = false;
                    }
                });
                
            });

            ///THỰC HIỆN KHI isFormValid = TRUE HAY FALSE:
            /*ý tưởng:  nếu ta muốn submit bằng JS, thì bên script cần thêm thuộc tính onSubmit = function(data),
                        xét options.onSubmit === 'function' (kiểm tra xem có thuộc tính onSubmit là 1 hàm nào không?)
                        nếu có thì viết hàm trả về các value trong formValues, sau đó thực hiện submit bằng hàm onSubmit,
                        hàm reduce của mảng có thể làm việc này dễ dàng, nhưng khi duyệt lấy values trong formValue thì
                        kết quả trả về lại không phải là 1 mảng, là 1 nodeList, nên ta phải ép kiểu thành 1 mảng, sau đó gọi reduce().
             */
            if(isFormValid){
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')   //chỉ lấy các thẻ có thuộc tính name và k có thuộc tính disabled
                    var formValues = Array.from(enableInputs).reduce(function(values, input){   //accumulator và currentValue
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="'+input.name+'"]:checked');
                                if(values[input.name] === null){
                                    values[input.name] = '';
                                }else{
                                    values[input.name] = formElement.querySelector('input[name="'+input.name+'"]:checked').value;
                                }
                                break;
                            case 'checkbox':
                                if(!input.matches(':checked')) {    
                                    return values;
                                };
                                if(!Array.isArray(values[input.name])){
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value); 
                                break;  
                            case 'file':
                                values[input.name] = input.files;
                                break                   
                            default:
                                values[input.name] = input.value;
                        } 
                        return values;    
                    },{});
                    options.onSubmit(formValues);   //thực hiện submit bằng JS. 
                }
                //trường hợp submit với hành vi mặc định: (submit bằng HTML khi không có hàm onSubmit nào bên script)
                else{
                    formElement.submit();
                }
                
            }

                       
        }

        //TA CẦN DUYỆT QUA CÁC LUẬT TRONG RULES (trong validator), để lấy ra tất cả các rule và ném vào 1 mảng (lưu tất cả các luật)
/*      ý tưởng:    rules đã được định nghĩa là 1 mảng, nên ta sẽ dùng forEach để lặp qua các rule, và lưu các rule đó vào 1 object trống (selectorRule) đã được 
                    khai báo trước, sau đó thực hiện các công việc onblur và oninput                   
        
        vấn đề :    đối với mỗi thẻ input đều có 1 bộ luật lệ, nên ta cần phải lưu các luật lệ dưới dạng object, mỗi phần tử gồm tên các thẻ (rule.selector) 
                    và các luật của mỗi thẻ (rule.test), mà selectorRule[rule.selector] ban đầu lại là underfined, ta không thể dùng hàm push() để thêm vào mảng,
                    nên lần đầu tiên ta phải gán cho nó : selectorRule[rule.selector] = [rule.test],
                    sau đó thì selectorRule[rule.selector] không còn là underfined nữa, ta có thể dùng lệnh push() để thêm các luật rule.test vào.  
        
        bắt buộc:   bắt buộc phải là selectorRule[rule.selector] vì luật của thẻ nào phải được lưu với name của nó (rule.selector),
                    nếu ta lưu tất cả luật vào 1 mảng hoặc 1 object mà không chia ra theo từng name, thì khi in ra lỗi thì sẽ gặp lỗi 'không in đúng lỗi' ngay                                                   
 */
        options.rules.forEach(function(rule) {   
            if (Array.isArray(selectorRule[rule.selector])) {  //=selectorRule[#fullname] = [function test] 
                // Lần thứ 2 trở đi, selectorRule đã là mảng nên ta có thể push thêm rule vào                 
                selectorRule[rule.selector].push(rule.test);

            } else {
                // Lần đầu tiên mỗi lần chạy: thì selectorRule[rule.selector] là 1 underfined, nên lọt xuống else, sau khi else đầu tiên kết thúc
                // thì selectorRule[rule.selector] từ đó trở đi đã là 1 mảng 
                selectorRule[rule.selector] = [rule.test];  //phải là [rule.test] vì ta dùng Array.isArray
            }

            var inputElements = formElement.querySelectorAll(rule.selector); //lấy thẻ input đang được click vào
            Array.from(inputElements);
            inputElements.forEach(inputElement => {
                if(inputElement){
                    inputElement.onblur = function(){
                        validate(inputElement, rule);
                    }
                    inputElement.oninput = function(){
                        showErrorMessage(inputElement);
                    }
                    inputElement.onchange = function(){
                        showErrorMessage(inputElement);
                    }
                }
            });
        });
    }

    //hàm thực hiện validate onblur: (hiện thẻ span form-message, đổi màu thẻ input->đỏ):
    /*ý tưởng : ta cần phải biết thẻ input nào đang được blur, nên ta cần truyền vào hàm inputElement, và đối tượng rule 
                các thẻ cần khai báo: message là thẻ sẽ in ra lỗi và rules là 1 mảng chứa các rule của phần tử đang được click.
                duyệt qua rules, tạo 1 biến là errorMessage = rules[i](inputElement.value), với rules[i](inputElement.value) là các function: test(value), function này
                sẽ return về underfined nếu k có lỗi hoặc 1 dòng message nếu có lỗi.
                Vì ta chỉ cần hiện 1 lỗi duy nhất trong mỗi trường hợp, nên trong mỗi lần duyệt qua rules, chỉ cần errorMessage k phải là underfined thì ta sẽ break ngay,
                nếu có lỗi, thì ta thêm class invalid vào thẻ đang có lỗi để người dùng biết là có lỗi, và in ra lỗi trên thẻ message
                nếu không có lỗi thì làm ngược lại
                cuối cùng return về true nếu có lỗi,  

    */
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    function validate(inputElement, rule){   
        var message = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);    //lấy thẻ span (thẻ in ra lỗi) 
        var rules = selectorRule[rule.selector];
        for (var i = 0; i < rules.length; i++) {

            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    var errorMessage = rules[i](document.querySelector(rule.selector + ':checked'));
                    break;
                default:
                    var errorMessage = rules[i](inputElement.value);
                    break;
            }
            
            if (errorMessage) {
                //gặp rule nào thì break luôn
                break;
            }
        }
        
        if(errorMessage){   
            message.innerText = errorMessage;  
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        }
        else{
            message.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        //trả về true nếu có lỗi 
        return !errorMessage;
    }

/*  hàm thực hiện validate oninput:
    ý tưởng: tham số truyền vào là 1 inputElement, kiểm tra xem inputElement.value có tồn tại hay không,
            nếu có thì thì xóa class invalid và xóa message lỗi đi, nếu không có thì làm ngược lại.
*/
    function showErrorMessage(inputElement){
        var message = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);    //lấy thẻ span (thẻ in ra lỗi)
        if(!inputElement.value.trim()){
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        }else{
            message.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');         
        }
    }

}

//định nghĩa rules:
Validator.isRequired = function(selector, message){
    return{
        selector : selector,    //selector bên phải là các thẻ input : #fullname, #email,...
        test: function(value){
            return value ? undefined : message || 'Ô này không được để trống';
        }
    }

}
Validator.isEmail = function(selector, message){
    return{
        selector : selector,
        test: function(value){
            var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return regex.test(value) ? undefined : message || 'Ô này không được để trống'    //hàm .test() tương tự hàm equal() trong java
        }
    }
}
Validator.isMinLength = function(selector, minLength, message){
    return{
        selector : selector,
        test: function(value){
            return value.trim().length >= minLength ? undefined : message || `mật khẩu lớn hơn ${minLength} kí tự`;
        }
    }
}
Validator.isConfirmation = function(selector, getConfirmValue, message){
    return{
        selector : selector,
        test: function(value){
            return (value === getConfirmValue() && value) ? undefined : message || 'Giá trị nhập vào không đúng';
        }
    }
}