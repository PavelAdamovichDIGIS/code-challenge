class Color {
	constructor(name, hex, rgb) {
		this.name = name;
		this.hex = hex;
		this.rgb = rgb;
	}

	toString() {
		return `Color name: ${this.name}; HEX code: ${this.hex}; RGB value: ${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}`
	}
}

class Green extends Color {
	constructor() {
		super('green');
	}
}

class Blue extends Color {
	constructor() {
		super('blue');
	}
}

class Red extends Color {
  constructor() {
    super('red');
  }
}

module.exports = { Color, Green, Blue, Red };
