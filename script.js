const basic = {
    powerReserve: 750,
    price: 89990,
    speed: 60,
    temp: 20,
    disks: 19,
    duration: 1000
};

const power = document.querySelector('#power');
const price = document.querySelector('#price');
const speed = document.querySelector('#speed');
const temp = document.querySelector('#temp');
const disks = document.querySelector('#diskSize');
const airConditioner = document.querySelector('#air');

const tempBtns = document.querySelectorAll('#temp__btn');
const speedBtns = document.querySelectorAll('#speed__btn');
const diskBtns = document.querySelectorAll('#disk__btn');

const diskImages = document.querySelectorAll('.disks img');

function reload() {
    power.innerHTML = `${basic.powerReserve}км`;
    price.innerHTML = `$${basic.price.toLocaleString()}`;
    speed.innerHTML = `${basic.speed} км/ч`;
    temp.innerHTML = `${basic.temp}°`;
    disks.innerHTML = `${basic.disks}`;

    diskImages.forEach((disk) => {
        disk.style.animationDuration = `${basic.duration}ms`;
    });
}
reload();

tempBtns.forEach((btn) => {
    btn.onclick = () => {
        const attr = btn.getAttribute('data-action');

        if (attr === 'inc' && basic.temp < 40) {
            basic.temp++;
            basic.powerReserve -= 5;
        }

        if (attr === 'dec' && basic.temp > -10) {
            basic.temp--;
            basic.powerReserve += 5;
        }

        reload();
    }
});

speedBtns.forEach((btn) => {
    btn.onclick = () => {
        const attr = btn.getAttribute('data-action');

        if (attr === 'inc' && basic.speed < 300) {
            basic.speed += 10;
            basic.powerReserve -= 10;
            basic.duration -= 30;
        }

        if (attr === 'dec' && basic.speed > 0) {
            basic.speed -= 10;
            basic.powerReserve += 10;
            basic.duration += 30;
        }

        reload();

        if (basic.speed === 0) {
            diskImages.forEach((disk) => {
                disk.style.animationDuration = `0ms`;
            });
        }
    }
});

diskBtns.forEach((btn) => {
    btn.onclick = () => {
        const attr = btn.getAttribute('data-action');

        if (attr === 'inc' && basic.disks < 21) {
            basic.disks += 1;
            basic.price += 1000;

            diskImages.forEach((disk) => {
                disk.style.width = `${disk.width + 5}px`;
                disk.style.height = `${disk.height + 5}px`;
            });
        }

        if (attr === 'dec' && basic.disks > 16) {
            basic.disks -= 1;
            basic.price -= 1000;

            diskImages.forEach((disk) => {
                disk.style.width = `${disk.width - 5}px`;
                disk.style.height = `${disk.height - 5}px`;
            });
        }

        reload();
    }
});
airConditioner.onchange = () => {
    if (airConditioner.checked) {
        basic.powerReserve -= 10;
    } else {
        basic.powerReserve += 10;
    }
    reload();
}
