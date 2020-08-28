import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


interface Request{
  title:string;
  type:'income' | 'outcome';
  value:number;
}

class CreateTransactionService {

  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,type,value}:Request): Transaction {

      this.checkType(type);

      if(type === 'outcome'){
          this.checkFunds(value);
      }


   return this.transactionsRepository.create({title,type,value});

  }

  protected checkType(type:string){

    if(!['income','outcome'].includes(type)){
      throw Error('The type must be income or outcome');
    }

  }

  protected checkFunds(value:number){

      const {total} = this.transactionsRepository.getBalance();
      if(total - value < 0){
        throw Error('You do not have enough balance');
      }

  }
}

export default CreateTransactionService;
