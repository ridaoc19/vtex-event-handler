import { ToolBox } from '../../utils/Toolbox';

export class Data {
	private readonly toolBox = ToolBox;
	constructor() {
		this.toolBox = ToolBox;
	}

	public async getOrderForm({ setTimeout }: { setTimeout: boolean }): Promise<OrderFormType.OrderForm | null> {
		if (setTimeout) await this.toolBox.delayExecution(1000);

		return localStorage?.orderform ? JSON.parse(localStorage?.orderform) : null;
	}
}
