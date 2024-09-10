"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ItemsService = class ItemsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllItems() {
        return this.prisma.item.findMany({
            orderBy: { timestamp: 'desc' },
        });
    }
    async getItemById(id) {
        const item = await this.prisma.item.findFirst({ where: { id } });
        if (!item) {
            throw new common_1.NotFoundException('Item not found');
        }
        return item;
    }
    async createItem(createItemDto, userId) {
        return this.prisma.item.create({
            data: {
                ...createItemDto,
                userId,
            },
        });
    }
    async updateItem(id, updateItemDto, userId) {
        const item = await this.getItemById(id);
        if (item.userId !== userId) {
            throw new common_1.UnauthorizedException('You can only edit items you created');
        }
        return this.prisma.item.update({
            where: { id },
            data: updateItemDto,
        });
    }
    async deleteItem(id, userId) {
        const item = await this.getItemById(id);
        if (item.userId !== userId) {
            throw new common_1.UnauthorizedException('You can only delete items you created');
        }
        return this.prisma.item.delete({ where: { id } });
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemsService);
//# sourceMappingURL=items.service.js.map