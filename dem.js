ois = document.querySelectorAll(".o input")
tst = document.querySelector(".toast")
function onAllFilled(value) {
    console.log('All inputs filled:', value);
    tst.classList.add("show")
    tst.innerText=''+value+' is our lucky number too!'
    // setTimeout(() => {
    //     tst.innerText=''
    //     tst.classList.remove("show")
    // }, 3000);
  }
  function checkAllFilled() {
    const allFilled = realValues.every(v => v.length === 1);
    if (allFilled) {
      const value = realValues.join('');
      onAllFilled(value);
    }
  }

  const realValues = Array(ois.length).fill("");
ois.forEach((input, i) => {

    input.addEventListener('beforeinput', (e) => {
        if (e.data && /[^0-9]/.test(e.data)) {
          e.preventDefault();
        }
      });
    input.addEventListener('input', (e) => {
        let value = e.data || input.value;
  
        if (!value) return;
  
        if (value.length > 1) {
          value = value.slice(0, 1);
        }
  
        realValues[i] = value;
  
        maskvals={"star":"★","star_outline":"⚝","asterisk":"✱","spark":"⯌","dot":"⏺","box":"■","chevron":"⮝","heart":"❤"}
        input.value = "✱";

        const next = ois[i + 1];
        if (value && next) next.focus();
  
        checkAllFilled();
      });
  
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (realValues[i]) {
            realValues[i] = "";
            input.value = "";
          } else {
            const prev = ois[i - 1];
            if (prev) {
              realValues[i - 1] = "";
              prev.value = "";
              prev.focus();
              e.preventDefault();
            }
          }
        }
      });
  
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text');
        const chars = pasteData.split('');
  
        for (let j = 0; j < chars.length && i + j < ois.length; j++) {
          realValues[i + j] = chars[j];
          ois[i + j].value = "★";
        }
  
        const nextIndex = i + chars.length;
        if (nextIndex < ois.length) {
          ois[nextIndex].focus();
        } else {
          ois[ois.length - 1].focus();
        }
  
        checkAllFilled();
      })
  });