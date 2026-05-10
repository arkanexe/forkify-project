var Fraction = function (numerator, denominator) {
  if (typeof numerator !== 'undefined' && denominator) {
    if (typeof numerator === 'number' && typeof denominator === 'number') {
      this.numerator = numerator;
      this.denominator = denominator;
    } else if (
      typeof numerator === 'string' &&
      typeof denominator === 'string'
    ) {
      this.numerator = parseInt(numerator);
      this.denominator = parseInt(denominator);
    }
  } else if (typeof denominator === 'undefined') {
    var num = numerator;

    if (typeof num === 'number') {
      this.numerator = num;
      this.denominator = 1;
    } else if (typeof num === 'string') {
      var a;
      var b;
      var arr = num.split(' ');

      if (arr[0]) a = arr[0];
      if (arr[1]) b = arr[1];

      if (a % 1 === 0 && b && b.match('/')) {
        return new Fraction(a).add(new Fraction(b));
      }

      if (a && !b) {
        if (typeof a === 'string' && a.match('/')) {
          var f = a.split('/');
          this.numerator = f[0];
          this.denominator = f[1];
        } else if (typeof a === 'string' && a.match('\\.')) {
          return new Fraction(parseFloat(a));
        } else {
          this.numerator = parseInt(a);
          this.denominator = 1;
        }
      } else {
        return undefined;
      }
    }
  }

  this.normalize();
};

Fraction.prototype.clone = function () {
  return new Fraction(this.numerator, this.denominator);
};

Fraction.prototype.toString = function () {
  if (this.denominator === 'NaN') return 'NaN';

  var wholepart =
    this.numerator / this.denominator > 0
      ? Math.floor(this.numerator / this.denominator)
      : Math.ceil(this.numerator / this.denominator);
  var numerator = this.numerator % this.denominator;
  var denominator = this.denominator;
  var result = [];

  if (wholepart != 0) result.push(wholepart);
  if (numerator != 0)
    result.push(
      (wholepart === 0 ? numerator : Math.abs(numerator)) + '/' + denominator
    );

  return result.length > 0 ? result.join(' ') : 0;
};

Fraction.prototype.rescale = function (factor) {
  this.numerator *= factor;
  this.denominator *= factor;
  return this;
};

Fraction.prototype.add = function (b) {
  var a = this.clone();

  if (b instanceof Fraction) {
    b = b.clone();
  } else {
    b = new Fraction(b);
  }

  var td = a.denominator;
  a.rescale(b.denominator);
  b.rescale(td);
  a.numerator += b.numerator;

  return a.normalize();
};

Fraction.prototype.subtract = function (b) {
  var a = this.clone();

  if (b instanceof Fraction) {
    b = b.clone();
  } else {
    b = new Fraction(b);
  }

  var td = a.denominator;
  a.rescale(b.denominator);
  b.rescale(td);
  a.numerator -= b.numerator;

  return a.normalize();
};

Fraction.prototype.multiply = function (b) {
  var a = this.clone();

  if (b instanceof Fraction) {
    a.numerator *= b.numerator;
    a.denominator *= b.denominator;
  } else if (typeof b === 'number') {
    a.numerator *= b;
  } else {
    return a.multiply(new Fraction(b));
  }

  return a.normalize();
};

Fraction.prototype.divide = function (b) {
  var a = this.clone();

  if (b instanceof Fraction) {
    a.numerator *= b.denominator;
    a.denominator *= b.numerator;
  } else if (typeof b === 'number') {
    a.denominator *= b;
  } else {
    return a.divide(new Fraction(b));
  }

  return a.normalize();
};

Fraction.prototype.equals = function (b) {
  if (!(b instanceof Fraction)) {
    b = new Fraction(b);
  }

  var a = this.clone().normalize();
  b = b.clone().normalize();
  return a.numerator === b.numerator && a.denominator === b.denominator;
};

Fraction.prototype.normalize = (function () {
  var isFloat = function (n) {
    return (
      typeof n === 'number' &&
      ((n > 0 && n % 1 > 0 && n % 1 < 1) ||
        (n < 0 && n % -1 < 0 && n % -1 > -1))
    );
  };

  var roundToPlaces = function (n, places) {
    if (!places) return Math.round(n);
    var scalar = Math.pow(10, places);
    return Math.round(n * scalar) / scalar;
  };

  return function () {
    if (isFloat(this.denominator)) {
      var d = roundToPlaces(this.denominator, 9);
      var scaleD = Math.pow(10, d.toString().split('.')[1].length);
      this.denominator = Math.round(this.denominator * scaleD);
      this.numerator *= scaleD;
    }

    if (isFloat(this.numerator)) {
      var n = roundToPlaces(this.numerator, 9);
      var scaleN = Math.pow(10, n.toString().split('.')[1].length);
      this.numerator = Math.round(this.numerator * scaleN);
      this.denominator *= scaleN;
    }

    var gcf = Fraction.gcf(this.numerator, this.denominator);
    this.numerator /= gcf;
    this.denominator /= gcf;

    if (
      (this.numerator < 0 && this.denominator < 0) ||
      (this.numerator > 0 && this.denominator < 0)
    ) {
      this.numerator *= -1;
      this.denominator *= -1;
    }

    return this;
  };
})();

Fraction.gcf = function (a, b) {
  var commonFactors = [];
  var fa = Fraction.primeFactors(a);
  var fb = Fraction.primeFactors(b);

  fa.forEach(function (factor) {
    var i = fb.indexOf(factor);
    if (i >= 0) {
      commonFactors.push(factor);
      fb.splice(i, 1);
    }
  });

  if (commonFactors.length === 0) return 1;

  var gcf = commonFactors[0];
  for (var i = 1; i < commonFactors.length; i++) {
    gcf *= commonFactors[i];
  }

  return gcf;
};

Fraction.primeFactors = function (n) {
  var num = Math.abs(n);
  var factors = [];
  var factor = 2;

  while (factor * factor <= num) {
    if (num % factor === 0) {
      factors.push(factor);
      num /= factor;
    } else {
      factor++;
    }
  }

  if (num != 1) factors.push(num);

  return factors;
};

export { Fraction };
