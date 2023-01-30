import throttle from 'lodash.throttle';
const FEEDBACK_LOCKAL_STORAGE = 'feedback-form-state';
const feedback = document.querySelector('.feedback-form');

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const remove = key => {
  try {
      localStorage.removeItem(key);
  } catch (error) {
    console.error("Error: ", error.message);
  }
};

getFbData();

const fbInput = (event) => {
    const { name, value } = event.target;
    try {
        let saveData = load(FEEDBACK_LOCKAL_STORAGE); 
        saveData = saveData ? saveData : {};
        saveData[name] = value;
        save(FEEDBACK_LOCKAL_STORAGE, saveData);
    } catch (error) {
        console.error(error);
    };
};

const fbThrottle = throttle(fbInput, 500);
feedback.addEventListener('input', fbThrottle);


function getFbData() {   
    const saveData = load(FEEDBACK_LOCKAL_STORAGE);
    if (!saveData) {
        return}
    Object.entries(saveData).forEach(([name, value]) => {
        feedback.elements[name].value = value;
        });
}

const fbSubmit = event => {
    event.preventDefault();
    const { elements: { email, message } }
        = event.currentTarget;
    console.log({email:email.value, message:message.value});
    event.currentTarget.reset();
    remove(FEEDBACK_LOCKAL_STORAGE);
}

feedback.addEventListener('submit', fbSubmit);