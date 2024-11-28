class DataPool
{
	private static instance: DataPool;
	private calendarEnabled: boolean;
  
	// Private constructor to prevent direct construction calls with the `new` operator.
	private constructor() 
	{
		this.calendarEnabled = false;
	}
  
	// The static method that controls access to the singleton instance.
	public static getInstance(): DataPool 
	{
	  	if (!DataPool.instance) 
		{
			DataPool.instance = new DataPool();
	  	}
	  	return DataPool.instance;
	}

  public getCalendarEnabled(): boolean
  {
    return this.calendarEnabled;
  }

  public setCalendarEnabled(calendarEnabled: boolean): void
  {
    this.calendarEnabled = calendarEnabled;
  }
}
  export default DataPool;