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
var playwright = require('playwright');
var _a = require('worker_threads'), isMainThread = _a.isMainThread, workerData = _a.workerData, parentPort = _a.parentPort;
var worker = require('worker_threads').Worker;
var _b = require('./helpers'), pause = _b.pause, stringParser = _b.stringParser, toCSV = _b.toCSV;
(function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!isMainThread) return [3 /*break*/, 1];
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var i, thread;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < 3)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, pause(3000)];
                                    case 2:
                                        _a.sent();
                                        thread = new worker(__filename, {
                                            workerData: i
                                        });
                                        thread.on('message', function (res) { return resolve(res); });
                                        thread.on('error', function (e) { return reject(e); });
                                        thread.on('exit', function (res) { return resolve(res); });
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    console.log(workerData);
                    _a = workerData;
                    switch (_a) {
                        case 0: return [3 /*break*/, 2];
                        case 1: return [3 /*break*/, 4];
                        case 2: return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 8];
                case 2: return [4 /*yield*/, getCSV('nvidia 3060')];
                case 3:
                    _b.sent();
                    parentPort.postMessage('Complete');
                    return [3 /*break*/, 9];
                case 4: return [4 /*yield*/, getCSV('nvidia 3070')];
                case 5:
                    _b.sent();
                    parentPort.postMessage('Complete');
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, getCSV('nvidia 3080')];
                case 7:
                    _b.sent();
                    parentPort.postMessage('Complete');
                    return [3 /*break*/, 9];
                case 8:
                    console.log('Errored out');
                    throw new Error();
                case 9: return [2 /*return*/];
            }
        });
    });
})();
function getCSV(query) {
    return __awaiter(this, void 0, void 0, function () {
        var content, i, erroredOut, item, e_1, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = [];
                    i = 19;
                    erroredOut = false;
                    _a.label = 1;
                case 1:
                    if (!!erroredOut) return [3 /*break*/, 6];
                    item = void 0;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, getItem(i, query)];
                case 3:
                    item = _a.sent();
                    if (item.price) {
                        item.price = stringParser(item.price);
                        content.push(item);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    erroredOut = true;
                    return [3 /*break*/, 5];
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6:
                    i = 19;
                    content.sort(function (a, b) { return a.price - b.price; });
                    res = content.length <= 3 ? content : content.slice(0, 3);
                    return [4 /*yield*/, toCSV(res, query)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getItem(index, query, browserType) {
    if (browserType === void 0) { browserType = 'chromium'; }
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page, obj, url, price, e_2, date, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, playwright[browserType].launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newContext()];
                case 2:
                    context = _a.sent();
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _a.sent();
                    // Go to https://www.amazon.com/
                    return [4 /*yield*/, page.goto('https://www.amazon.com/')];
                case 4:
                    // Go to https://www.amazon.com/
                    _a.sent();
                    // Click Search bar
                    return [4 /*yield*/, page.locator('[aria-label="Search"]').click()];
                case 5:
                    // Click Search bar
                    _a.sent();
                    // Fill Search bar
                    return [4 /*yield*/, page.locator('[aria-label="Search"]').fill(query)];
                case 6:
                    // Fill Search bar
                    _a.sent();
                    // Press Enter
                    return [4 /*yield*/, Promise.all([
                            page.waitForNavigation(),
                            page.locator('[aria-label="Search"]').press('Enter')
                        ])];
                case 7:
                    // Press Enter
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 15, , 17]);
                    // Click img
                    return [4 /*yield*/, Promise.all([
                            page.waitForNavigation(),
                            page.locator('img.s-image').nth(index).click()
                        ])];
                case 9:
                    // Click img
                    _a.sent();
                    url = page.url();
                    price = void 0;
                    _a.label = 10;
                case 10:
                    _a.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, page.locator('.apexPriceToPay:visible').last().textContent({ timeout: 15000 })];
                case 11:
                    price = _a.sent();
                    return [3 /*break*/, 13];
                case 12:
                    e_2 = _a.sent();
                    price = undefined;
                    return [3 /*break*/, 13];
                case 13:
                    date = new Date(Date.now())
                        .toLocaleString('en-GB', { timeZone: 'UTC' })
                        .split(',')[0];
                    obj = {
                        price: price,
                        date: date,
                        url: url
                    };
                    //return to original search
                    return [4 /*yield*/, browser.close()];
                case 14:
                    //return to original search
                    _a.sent();
                    return [2 /*return*/, obj];
                case 15:
                    e_3 = _a.sent();
                    console.log(e_3);
                    return [4 /*yield*/, browser.close()];
                case 16:
                    _a.sent();
                    throw new Error('No items found in search');
                case 17: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    getItem: getItem
};
