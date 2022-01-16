"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        this.title = 'teller';
        this.isQuizFinished = true;
        this.currentRotation = 0;
        this.currentPartOfPlate = 1;
        this.currentAudio = new Audio();
        this.httpClient = http;
    }
    AppComponent.prototype.ngOnInit = function () {
        // camData();
        serverData.camData(this.returnDataFromCam);
        this.getFile('/assets/config.json');
    };
    AppComponent.prototype.returnDataFromCam = function (data) {
        console.log(data);
    };
    AppComponent.prototype.getFile = function (pathToFile) {
        var _this = this;
        this.httpClient.get(pathToFile, { responseType: 'json' }).subscribe(function (data) {
            _this.configData = data;
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An error occurred:', err.error.message);
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log("Backend returned code " + err.status + ", body was: " + err.error);
            }
        });
    };
    AppComponent.prototype.stopMovement = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.startMovement = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rotate(0.01)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.rotate = function (deg, stop) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(deg >= 0.5 && !stop)) return [3 /*break*/, 2];
                        deg += 0.01;
                        if (this.currentRotation >= 360) {
                            this.currentRotation = 0;
                        }
                        this.currentRotation += deg;
                        return [4 /*yield*/, this.delay(1)];
                    case 1:
                        _a.sent();
                        this.rotate(deg, true);
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(deg < 0.5 && !stop)) return [3 /*break*/, 4];
                        deg += 0.01;
                        if (this.currentRotation >= 360) {
                            this.currentRotation = 0;
                        }
                        this.currentRotation += deg;
                        return [4 /*yield*/, this.delay(1)];
                    case 3:
                        _a.sent();
                        this.rotate(deg);
                        return [3 /*break*/, 6];
                    case 4:
                        if (!(deg > 0 && stop)) return [3 /*break*/, 6];
                        deg -= 0.01;
                        if (this.currentRotation >= 360) {
                            this.currentRotation = 0;
                        }
                        this.currentRotation += deg;
                        return [4 /*yield*/, this.delay(1)];
                    case 5:
                        _a.sent();
                        this.rotate(deg, true);
                        _a.label = 6;
                    case 6:
                        if (deg <= 0) {
                            console.log("currentRotation " + this.currentRotation);
                            this.isQuizFinished ? this.afterStopOfRotation() : "";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.afterStopOfRotation = function () {
        if (this.configData) {
            for (var _i = 0, _a = this.configData['plateSection'].entries(); _i < _a.length; _i++) {
                var _b = _a[_i], index = _b[0], element = _b[1];
                var firstCoordinate = element[index + 1]["from"];
                var secondCoordinate = element[index + 1]["until"];
                console.log("first " + firstCoordinate);
                console.log("second " + secondCoordinate);
                console.log("currentRotation " + this.currentRotation);
                if (this.checkPartOfPlate(Number(firstCoordinate), Number(secondCoordinate))) {
                    this.currentPartOfPlate = index + 1;
                    console.log("partOfPlate = " + this.currentPartOfPlate);
                    break;
                }
            }
            this.playAudio();
        }
    };
    AppComponent.prototype.checkPartOfPlate = function (start, end) {
        if (start < end) {
            if (this.currentRotation >= start && this.currentRotation <= end) {
                return true;
            }
        }
        if (start > end) {
            if (this.currentRotation > start || this.currentRotation < end) {
                return true;
            }
        }
        return false;
    };
    AppComponent.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    AppComponent.prototype.stopAudio = function () {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
    };
    AppComponent.prototype.playAudio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (this.currentAudio.src.split("/assets")[1] !== this.configData['plateSection'][this.currentPartOfPlate][this.currentPartOfPlate + 1]["audioPath"].split("/assets")[1]) {
                            this.stopAudio();
                        }
                        console.log(this.currentAudio.src.split("/assets")[1]);
                        console.log(this.configData['plateSection'][this.currentPartOfPlate][this.currentPartOfPlate + 1]["audioPath"].split("/assets")[1]);
                        if (!(this.currentAudio.src.split("/assets")[1] !== this.configData['plateSection'][this.currentPartOfPlate][this.currentPartOfPlate + 1]["audioPath"].split("/assets")[1])) return [3 /*break*/, 2];
                        // console.log(this.currentAudio.src.split("/assets")[1])
                        console.log("in loop");
                        this.currentAudio.src = this.configData['plateSection'][this.currentPartOfPlate][this.currentPartOfPlate + 1]["audioPath"];
                        this.currentAudio.load();
                        this.currentAudio.play();
                        return [4 /*yield*/, this.delay(2000)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.currentAudio.onended = function () {
                        };
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log("error while playing Audio");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
